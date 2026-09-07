import api from "./api";
import { Colaborador } from "../types/Colaborador";
import { Postura } from "../types/Postura";
import { SessaoTrabalho } from "../types/SessaoTrabalho";
import { Risco } from "../types/Risco";

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
    const response = await api.post<Colaborador>
        ("/colaboradores", novoColaborador);

    return response.data;
}