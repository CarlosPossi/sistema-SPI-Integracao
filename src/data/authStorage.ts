import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = '@securit_user';

export interface StoredUser {
    nome: string;
    email: string;
    cargo: string;
}

export async function saveUser(user: StoredUser): Promise<void> {
    try {
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
        console.error('Erro ao salvar usuário:', error);
    }
}

export async function getUser(): Promise<StoredUser | null> {
    try {
        const data = await AsyncStorage.getItem(USER_KEY);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return null;
    }
}

export async function logoutUser(): Promise<void> {
    try {
        await AsyncStorage.removeItem(USER_KEY);
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
    }
}