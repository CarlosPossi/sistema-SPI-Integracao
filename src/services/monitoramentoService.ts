import api from "./api";
import { Monitoramento } from "../types/Monitoramento";

export async function listarMonitoramento():
Promise<Monitoramento[]> {
    const response = await api.get<Monitoramento[]>
    ("/monitoramentos");

    return response.data;
}

export async function buscarMonitoramentosPorId(id: number):
Promise<Monitoramento> {
    const response = await api.get<Monitoramento>
    (`/monitoramentos/${id}`);

    return response.data
}

export async function atualizarMonitoramentos(id: number, dados: Monitoramento):
Promise<Monitoramento> {
    const response = await api.put<Monitoramento>
    (`/monitoramentos/${id}`, dados);

    return response.data
}