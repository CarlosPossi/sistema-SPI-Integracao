import api from "./api";
import { Colaborador } from "../types/Colaborador";
import { Postura } from "../types/Postura";
import { SessaoTrabalho } from "../types/SessaoTrabalho";
import { Risco } from "../types/Risco";
import { criarPostura, excluirPostura } from "./posturaService";
import { criarSessaoTrabalho, excluirSessaoTrabalho } from "./sessaoTrabalhoService";
import { criarRisco, excluirRisco } from "./riscoService";

type NovoColaborador = Omit<Colaborador, "id" | "postura" | "sessaoTrabalho" | "risco"> & {
    postura?: Omit<Postura, "id">;
    sessaoTrabalho?: Omit<SessaoTrabalho, "id">;
    risco?: Omit<Risco, "id">;
};

export async function listarColaboradores():
    Promise<Colaborador[]> {
    const response = await api.get<Colaborador[]>
        ("/colaboradores");

    return response.data;
}

export async function buscarColaboradorPorId(id: number):
    Promise<Colaborador> {
    const response = await api.get<Colaborador>
        (`/colaboradores/${id}`);

    return response.data;
}

export async function atualizarColaborador(id: number, dados: Colaborador):
    Promise<Colaborador> {
    const response = await api.put<Colaborador>
        (`/colaboradores/${id}`, dados);

    return response.data;
}

export async function adicionarColaborador(novoColaborador: NovoColaborador):
    Promise<Colaborador> {
    const { postura, sessaoTrabalho, risco, ...dados } = novoColaborador;
    const desfazer: (() => Promise<unknown>)[] = [];

    try {
        let posturaRef: { id: number } | undefined;
        let sessaoRef: { id: number } | undefined;
        let riscoRef: { id: number } | undefined;

        if (postura && postura.classificacaoRiscoErgonomico?.trim()) {
            const criada = await criarPostura(postura);
            desfazer.push(() => excluirPostura(criada.id));
            posturaRef = { id: criada.id };
        }

        if (sessaoTrabalho && sessaoTrabalho.inicioTrabalho?.trim()) {
            const criada = await criarSessaoTrabalho({
                inicioTrabalho: sessaoTrabalho.inicioTrabalho,
                tarefas: sessaoTrabalho.tarefas,
                fimTrabalho: sessaoTrabalho.fimTrabalho?.trim() ? sessaoTrabalho.fimTrabalho : undefined,
            });
            desfazer.push(() => excluirSessaoTrabalho(criada.id));
            sessaoRef = { id: criada.id };
        }

        if (risco && risco.comportamento?.trim()) {
            const criado = await criarRisco(risco);
            desfazer.push(() => excluirRisco(criado.id));
            riscoRef = { id: criado.id };
        }

        const response = await api.post<Colaborador>("/colaboradores", {
            ...dados,
            dataContrato: dados.dataContrato?.trim() ? dados.dataContrato : undefined,
            postura: posturaRef,
            sessaoTrabalho: sessaoRef,
            risco: riscoRef,
        });

        return response.data;
    } catch (error) {
        await Promise.allSettled(desfazer.map((fn) => fn()));
        throw error;
    }
}
