import api from "./api";
import { Alerta } from "../types/Alerta";

export async function listarAlertas():
Promise<Alerta[]> {
    const response = await api.get<Alerta[]>
    ("/alertas");

    return response.data;
}

export async function buscarAlertaPorId(id: number):
Promise<Alerta> {
    const response = await api.get<Alerta>
    (`/alertas/${id}`);

    return response.data;
}

export async function atualizarAlertas(id: number, dados: Alerta):
Promise<Alerta> {
    const response = await api.put<Alerta>
    (`/alertas/${id}`, dados);

    return response.data
}