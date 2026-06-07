import AsyncStorage from '@react-native-async-storage/async-storage';
import { MOCK_AMBIENTES } from '../data/AmbienteStorage';

const STORAGE_KEY = '@spi_ambientes';

export async function inicializarAmbientes() {
    await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(MOCK_AMBIENTES)
    );
}

export async function listarAmbientes() {
    const data = await AsyncStorage.getItem(STORAGE_KEY);

    if (!data) {
        return [];
    }

    return JSON.parse(data);
}

export async function adicionarAmbiente(novoAmbiente: any) {
    const ambientes = await listarAmbientes();

    ambientes.push(novoAmbiente);

    await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(ambientes)
    );
}