import AsyncStorage from '@react-native-async-storage/async-storage';
import { MOCK_COLABORADORES } from '../data/ColaboradoresStorage';

const STORAGE_KEY = '@spi_colaboradores';

export async function inicializarColaboradores() {
    await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(MOCK_COLABORADORES)
    );
}

export async function listarColaboradores() {
    const data = await AsyncStorage.getItem(STORAGE_KEY);

    if (!data) {
        return [];
    }

    return JSON.parse(data);
}

export async function adicionarColaborador(novoColaborador: any) {
    const colaboradores = await listarColaboradores();

    colaboradores.push(novoColaborador);

    await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(colaboradores)
    );
}