import api from "./api";
import { SessaoTrabalho } from "../types/SessaoTrabalho";

export async function listarSessoesTrabalho():
Promise<SessaoTrabalho[]> {
    const response = await api.get<SessaoTrabalho[]>
    ("/sessaodetrabalho");

    return response.data;
}

export async function buscarSessoesTrabalhoPorId(id: number):
Promise<SessaoTrabalho> {
    const response = await api.get<SessaoTrabalho>
    (`/sessaodetrabalho/${id}`);

    return response.data
}

export async function atualizarSessoesTrabalho(id: number, dados: SessaoTrabalho):
Promise<SessaoTrabalho> {
    const response = await api.put<SessaoTrabalho>
    (`/sessaodetrabalho/${id}`, dados);

    return response.data
}

export async function criarSessaoTrabalho(dados: Omit<SessaoTrabalho, "id" | "fimTrabalho"> & { fimTrabalho?: string }):
Promise<SessaoTrabalho> {
    const response = await api.post<SessaoTrabalho>
    ("/sessaodetrabalho", dados);

    return response.data;
}

export async function excluirSessaoTrabalho(id: number):
Promise<void> {
    await api.delete(`/sessaodetrabalho/${id}`);
}
