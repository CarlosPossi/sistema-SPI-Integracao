import api from "./api";
import { IndicadorSeguranca } from "../types/IndicadorSeguranca";

export async function listarIndicadoresSegurancas():
Promise<IndicadorSeguranca[]> {
    const response = await api.get<IndicadorSeguranca[]>
    ("/indicadoresseguranca");

    return response.data;
}

export async function buscarIndicadoresSegurancasPorId(id: number):
Promise<IndicadorSeguranca> {
    const response = await api.get<IndicadorSeguranca>
    (`/indicadoresseguranca/${id}`);

    return response.data
}

export async function atualizarIndicadoresSegurancas(id: number, dados: IndicadorSeguranca):
Promise<IndicadorSeguranca> {
    const response = await api.put<IndicadorSeguranca>
    (`/indicadoresseguranca/${id}`, dados);

    return response.data
}