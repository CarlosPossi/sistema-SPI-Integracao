import api from "./api";
import { Postura } from "../types/Postura";

export async function listarPosturas():
Promise<Postura[]> {
    const response = await api.get<Postura[]>
    ("/posturas");

    return response.data;
}

export async function buscarPosturasPorId(id: number):
Promise<Postura> {
    const response = await api.get<Postura>
    (`/posturas/${id}`);

    return response.data
}

export async function atualizarPosturas(id: number, dados: Postura):
Promise<Postura> {
    const response = await api.put<Postura>
    (`/posturas/${id}`, dados);

    return response.data
}

export async function criarPostura(dados: Omit<Postura, "id">):
Promise<Postura> {
    const response = await api.post<Postura>
    ("/posturas", dados);

    return response.data;
}

export async function excluirPostura(id: number):
Promise<void> {
    await api.delete(`/posturas/${id}`);
}
