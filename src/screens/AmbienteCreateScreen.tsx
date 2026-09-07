import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { adicionarAmbiente } from '../services/ambienteService';
import type { AmbienteStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<AmbienteStackParamList, 'AmbienteCreate'>;

function Field({ label, placeholder, value, onChange, keyboardType = 'default' }: { label: string; placeholder: string; value: string; onChange: (v: string) => void; keyboardType?: any }) {
    return (
        <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>{label}</Text>
            <TextInput placeholder={placeholder} placeholderTextColor={colors.muted} value={value} onChangeText={onChange} keyboardType={keyboardType} style={styles.input} />
        </View>
    );
}

export default function AmbienteCreateScreen({ navigation }: Props) {
    const [titulo, setTitulo] = useState('');
    const [temperatura, setTemperatura] = useState('');
    const [ruido, setRuido] = useState('');
    const [luminosidade, setLuminosidade] = useState('');
    const [presencaMaquina, setPresenca] = useState(true);
    const [usoCorretoEpi, setUsoCorretoEpi] = useState(true);
    const [taxaIncidente, setTaxaIncidente] = useState('');
    const [erro, setErro] = useState<string | null>(null);
    const [sucesso, setSucesso] = useState(false);
    const [salvando, setSalvando] = useState(false);

    async function handleSalvar() {
        setErro(null);
        setSucesso(false);

        if (!titulo || !temperatura || !ruido || !luminosidade || !taxaIncidente) {
            setErro('Preencha todos os campos obrigatórios antes de salvar.');
            return;
        }

        const novoAmbiente = {
            titulo,
            temperatura: Number(temperatura),
            ruido: Number(ruido),
            luminosidade: Number(luminosidade),
            presencaMaquina,
            indicadorSeguranca: {
                usoCorretoEpi,
                taxaIncidente: Number(taxaIncidente) / 100
            }
        };

        setSalvando(true);

        try {
            await adicionarAmbiente(novoAmbiente);
            setSucesso(true);
            setTimeout(() => navigation.goBack(), 800);
        } catch (error) {
            console.log('Erro ao cadastrar ambiente:', error);
            setErro('Não foi possível cadastrar o ambiente. Verifique se o servidor está ligado e tente novamente.');
        } finally {
            setSalvando(false);
        }
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={22} color={colors.text} />
                <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>

            <View style={styles.card}>
                <Text style={styles.title}>🏗️ Novo Ambiente</Text>
                <Text style={styles.subtitle}>Preencha os dados do setor monitorado</Text>

                {erro && (
                    <View style={styles.errorBox}>
                        <Ionicons name="alert-circle-outline" size={20} color={colors.danger} />
                        <Text style={styles.errorText}>{erro}</Text>
                    </View>
                )}

                {sucesso && (
                    <View style={styles.successBox}>
                        <Ionicons name="checkmark-circle-outline" size={20} color={colors.success} />
                        <Text style={styles.successText}>Ambiente cadastrado com sucesso!</Text>
                    </View>
                )}

                <Field label="Nome do setor" placeholder="Ex: Caldeiraria" value={titulo} onChange={setTitulo} />
                <Field label="Temperatura (°C)" placeholder="Ex: 24.5" value={temperatura} onChange={setTemperatura} keyboardType="numeric" />
                <Field label="Ruído (dB)" placeholder="Ex: 85" value={ruido} onChange={setRuido} keyboardType="numeric" />
                <Field label="Luminosidade (lux)" placeholder="Ex: 450" value={luminosidade} onChange={setLuminosidade} keyboardType="numeric" />
                <Field label="Taxa de Incidente (%)" placeholder="Ex: 5" value={taxaIncidente} onChange={setTaxaIncidente} keyboardType="numeric" />

                <Text style={styles.fieldLabel}>Presença de Máquina</Text>
                <TouchableOpacity style={[styles.toggle, presencaMaquina ? styles.toggleOn : styles.toggleOff]} onPress={() => setPresenca(!presencaMaquina)}>
                    <Ionicons name={presencaMaquina ? 'checkmark-circle' : 'close-circle'} size={22} color={presencaMaquina ? colors.success : colors.danger} />
                    <Text style={[styles.toggleText, { color: presencaMaquina ? colors.success : colors.danger }]}>
                        {presencaMaquina ? 'Máquina Ativa' : 'Máquina Inativa'}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.fieldLabel}>Uso Correto de EPI</Text>

                <TouchableOpacity
                    style={[styles.toggle, usoCorretoEpi ? styles.toggleOn : styles.toggleOff]}
                    onPress={() => setUsoCorretoEpi(!usoCorretoEpi)}
                >
                    <Ionicons
                        name={usoCorretoEpi ? 'checkmark-circle' : 'warning'}
                        size={22}
                        color={usoCorretoEpi ? colors.success : colors.danger}
                    />
                    <Text style={[styles.toggleText, { color: usoCorretoEpi ? colors.success : colors.danger }]}>
                        {usoCorretoEpi ? 'EPI em Conformidade' : 'EPI com Irregularidade'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.saveBtn, salvando && styles.saveBtnDisabled]} onPress={handleSalvar} disabled={salvando}>
                    {salvando ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.saveBtnText}>Salvar Ambiente</Text>
                    )}
                </TouchableOpacity>
            </View>
            <View style={{ height: 32 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 16
    },

    backBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 54,
        marginBottom: 20,
        gap: 8
    },

    backText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text
    },

    card: {
        backgroundColor: colors.card,
        borderRadius: 20,
        padding: 22,
        elevation: 4,
        borderWidth: 1,
        borderColor: colors.border
    },

    title: {
        fontSize: 24,
        fontWeight: '800',
        color: colors.text,
        textAlign: 'center'
    },

    subtitle: {
        fontSize: 14,
        color: colors.secondary,
        textAlign: 'center',
        marginTop: 4,
        marginBottom: 24
    },

    errorBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: colors.dangerBg,
        borderRadius: 12,
        padding: 14,
        marginBottom: 18
    },

    errorText: {
        flex: 1,
        color: colors.danger,
        fontWeight: '600',
        fontSize: 13
    },

    successBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: colors.successBg,
        borderRadius: 12,
        padding: 14,
        marginBottom: 18
    },

    successText: {
        flex: 1,
        color: colors.success,
        fontWeight: '600',
        fontSize: 13
    },

    fieldGroup: {
        marginBottom: 16
    },

    fieldLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.secondary,
        marginBottom: 6
    },

    input: {
        backgroundColor: colors.softCard,
        padding: 14,
        borderRadius: 12,
        color: colors.text,
        fontSize: 15,
        borderWidth: 1,
        borderColor: colors.border
    },

    toggle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: 14,
        borderRadius: 12,
        marginBottom: 20,
        marginTop: 4
    },

    toggleOn: {
        backgroundColor: colors.successBg
    },

    toggleOff: {
        backgroundColor: colors.dangerBg
    },

    toggleText: {
        fontWeight: '700',
        fontSize: 15
    },

    saveBtn: {
        backgroundColor: colors.primary,
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center'
    },

    saveBtnDisabled: {
        opacity: 0.6
    },

    saveBtnText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16
    },
});