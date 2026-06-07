import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ActivityIndicator, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { saveUser } from '../data/authStorage';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    async function handleLogin() {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Campos obrigatórios', 'Preencha e-mail e senha para continuar.');
            return;
        }
        setLoading(true);
        await new Promise((r) => setTimeout(r, 800));
        await saveUser({ nome: 'Carlos Possi', email, cargo: 'Operador Industrial' });
        setLoading(false);
        navigation.replace('App');
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.header}>
                <View style={styles.iconWrapper}>
                    <Ionicons name="shield-checkmark" size={52} color={colors.primary} />
                </View>
                <Text style={styles.title}>SecurtIT</Text>
                <Text style={styles.subtitle}>Sistema de Monitoramento Industrial</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Acesse sua conta</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>E-mail</Text>
                    <View style={styles.inputBox}>
                        <Ionicons name="mail-outline" size={18} color={colors.secondary} />
                        <TextInput
                            placeholder="seu@email.com"
                            placeholderTextColor={colors.muted}
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Senha</Text>
                    <View style={styles.inputBox}>
                        <Ionicons name="lock-closed-outline" size={18} color={colors.secondary} />
                        <TextInput
                            placeholder="••••••••"
                            placeholderTextColor={colors.muted}
                            secureTextEntry={!showPass}
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                            <Ionicons
                                name={showPass ? 'eye-off-outline' : 'eye-outline'}
                                size={18}
                                color={colors.secondary}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading
                        ? <ActivityIndicator color="#fff" />
                        : <Text style={styles.buttonText}>Entrar</Text>
                    }
                </TouchableOpacity>

                <Text style={styles.footer}>Acesso restrito a colaboradores autorizados</Text>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },

    header: { 
        alignItems: 'center', 
        marginBottom: 32 
    },

    iconWrapper: { 
        width: 88, 
        height: 88, 
        borderRadius: 24, 
        backgroundColor: colors.warningBg, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: 14, 
    },

    title: { 
        fontSize: 36, 
        fontWeight: '800', 
        color: colors.text, 
        letterSpacing: -1 
    },

    subtitle: { 
        fontSize: 14, 
        color: colors.secondary, 
        marginTop: 4, 
        textAlign: 'center' 
    },

    card: {
        backgroundColor: colors.card, 
        borderRadius: 20, 
        padding: 24,
        elevation: 6, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.08, 
        shadowRadius: 16,
    },

    cardTitle: { 
        fontSize: 18, 
        fontWeight: '700', 
        color: colors.text, 
        marginBottom: 20 
    },

    inputGroup: { 
        marginBottom: 16 
    },

    label: { 
        fontSize: 13, 
        fontWeight: '600', 
        color: colors.secondary, 
        marginBottom: 6 
    },

    inputBox: {
        flexDirection: 'row', 
        alignItems: 'center',
        backgroundColor: colors.softCard, 
        borderRadius: 12,
        paddingHorizontal: 14, 
        borderWidth: 1, 
        borderColor: colors.border, 
        height: 48, 
        gap: 10,
    },

    input: { 
        flex: 1, 
        color: colors.text, 
        fontSize: 15 
    },

    button: {
        backgroundColor: colors.primary, 
        paddingVertical: 15,
        borderRadius: 12, 
        alignItems: 'center', 
        marginTop: 8,
    },

    buttonDisabled: { 
        opacity: 0.7 
    },

    buttonText: { 
        color: '#fff', 
        fontWeight: '700', 
        fontSize: 16 
    },

    footer: { 
        textAlign: 'center', 
        marginTop: 16, 
        fontSize: 12, 
        color: colors.muted 
    },
});