import api from "./api";
import { Ambiente } from "../types/Ambiente";
import { IndicadorSeguranca } from "../types/IndicadorSeguranca";
import { criarIndicadorSeguranca, excluirIndicadorSeguranca } from "./indicadorSegurancaService";

type NovoAmbiente = Omit<Ambiente, "id" | "indicadorSeguranca"> & {
    indicadorSeguranca?: Omit<IndicadorSeguranca, "id">;
};

export async function listarAmbientes():
    Promise<Ambiente[]> {
    const response = await api.get<Ambiente[]>
        ("/ambientes");

    return response.data;
}

export async function buscarAmbientePorId(id: number):
    Promise<Ambiente> {
    const response = await api.get<Ambiente>
        (`/ambientes/${id}`);

    return response.data;
}

export async function atualizarAmbiente(id: number, dados: Ambiente):
    Promise<Ambiente> {
    const response = await api.put<Ambiente>
        (`/ambientes/${id}`, dados);

    return response.data;
}

export async function adicionarAmbiente(novoAmbiente: NovoAmbiente):
    Promise<Ambiente> {
    const { indicadorSeguranca, ...dados } = novoAmbiente;
    let indicadorCriado: IndicadorSeguranca | undefined;

    try {
        if (indicadorSeguranca) {
            indicadorCriado = await criarIndicadorSeguranca(indicadorSeguranca);
        }

        const response = await api.post<Ambiente>("/ambientes", {
            ...dados,
            indicadorSeguranca: indicadorCriado ? { id: indicadorCriado.id } : undefined,
        });

        return response.data;
    } catch (error) {
        if (indicadorCriado) {
            await excluirIndicadorSeguranca(indicadorCriado.id).catch(() => undefined);
        }
        throw error;
    }
}
