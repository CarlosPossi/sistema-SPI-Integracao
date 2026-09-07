import api from "./api";
import { Risco } from "../types/Risco";

export async function listarRiscos():
Promise<Risco[]> {
    const response = await api.get<Risco[]>
    ("/riscos");

    return response.data;
}

export async function buscarRiscosPorId(id: number):
Promise<Risco> {
    const response = await api.get<Risco>
    (`/riscos/${id}`);

    return response.data
}

export async function atualizarRiscos(id: number, dados: Risco):
Promise<Risco> {
    const response = await api.put<Risco>
    (`/riscos/${id}`, dados);

    return response.data
}