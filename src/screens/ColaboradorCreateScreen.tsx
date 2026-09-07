import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, KeyboardTypeOptions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { adicionarColaborador } from '../services/colaboradorService';
import type { EquipeStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<EquipeStackParamList, 'ColaboradorCreate'>;

export default function ColaboradorCreateScreen({ navigation }: Props) {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [cpf, setCpf] = useState('');
    const [sexo, setSexo] = useState('');
    const [dataContrato, setDataContrato] = useState('');
    const [nrs, setNrs] = useState('');
    const [asos, setAsos] = useState('');
    const [angulo, setAngulo] = useState('');
    const [classificacaoRisco, setClassificacaoRisco] = useState('');
    const [inicioTrabalho, setInicioTrabalho] = useState('');
    const [fimTrabalho, setFimTrabalho] = useState('');
    const [tarefas, setTarefas] = useState('');
    const [comportamento, setComportamento] = useState('');
    const [usoEpi, setUsoEpi] = useState('');
    const [historico, setHistorico] = useState('');
    const [documentacaoEmDia, setDocumentacaoEmDia] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
    const [sucesso, setSucesso] = useState(false);
    const [salvando, setSalvando] = useState(false);

    async function handleSalvar() {
        setErro(null);
        setSucesso(false);

        if (!nome.trim() || !cpf.trim()) {
            setErro('Nome e CPF são obrigatórios.');
            return;
        }

        const novoColaborador = {
            nome,
            idade: Number(idade) || 0,
            cpf,
            sexo,
            dataContrato,
            nrs: nrs.split(',').map(item => item.trim()).filter(Boolean),
            asos: asos.split(',').map(item => item.trim()).filter(Boolean),
            postura: {
                angulo: Number(angulo),
                classificacaoRiscoErgonomico: classificacaoRisco
            },
            sessaoTrabalho: {
                inicioTrabalho,
                fimTrabalho,
                tarefas: tarefas.split(',').map(item => item.trim()).filter(Boolean)
            },
            risco: {
                comportamento,
                usoEpi,
                historico: historico.split(',').map(item => item.trim()).filter(Boolean),
                documentacaoEmDia
            }
        };

        setSalvando(true);

        try {
            await adicionarColaborador(novoColaborador);
            setSucesso(true);
            setTimeout(() => navigation.goBack(), 800);
        } catch (error) {
            console.log('Erro ao cadastrar colaborador:', error);
            setErro('Não foi possível cadastrar o colaborador. Verifique se o servidor está ligado e tente novamente.');
        } finally {
            setSalvando(false);
        }
    }

    const campos: { label: string; val: string; set: (v: string) => void; ph: string; type: KeyboardTypeOptions }[] = [
        { label: 'Nome completo', val: nome, set: setNome, ph: 'Ex: Ricardo Mendes', type: 'default' },
        { label: 'CPF', val: cpf, set: setCpf, ph: '000.000.000-00', type: 'numeric' },
        { label: 'Idade', val: idade, set: setIdade, ph: 'Ex: 30', type: 'numeric' },
        { label: 'Sexo', val: sexo, set: setSexo, ph: 'Masculino / Feminino', type: 'default' },
        { label: 'Data de contrato', val: dataContrato, set: setDataContrato, ph: 'AAAA-MM-DD', type: 'default' },
    ];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={22} color={colors.text} />
                <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>

            <View style={styles.card}>
                <Text style={styles.title}>👷 Novo Colaborador</Text>
                <Text style={styles.subtitle}>Preencha os dados cadastrais</Text>

                {erro && (
                    <View style={styles.errorBox}>
                        <Ionicons name="alert-circle-outline" size={20} color={colors.danger} />
                        <Text style={styles.errorText}>{erro}</Text>
                    </View>
                )}

                {sucesso && (
                    <View style={styles.successBox}>
                        <Ionicons name="checkmark-circle-outline" size={20} color={colors.success} />
                        <Text style={styles.successText}>Colaborador cadastrado com sucesso!</Text>
                    </View>
                )}

                {campos.map(({ label, val, set, ph, type }) => (
                    <View key={label} style={styles.fieldGroup}>
                        <Text style={styles.fieldLabel}>{label}</Text>
                        <TextInput placeholder={ph} placeholderTextColor={colors.muted} value={val} onChangeText={set} keyboardType={type} style={styles.input} />
                    </View>
                ))}

                <Text style={styles.fieldLabel}>NRs</Text>
                <TextInput
                    style={styles.input}
                    value={nrs}
                    onChangeText={setNrs}
                    placeholderTextColor={colors.muted}
                    placeholder="NR-6, NR-10, NR-12"
                />

                <Text style={styles.fieldLabel}>ASOs</Text>
                <TextInput
                    style={styles.input}
                    value={asos}
                    onChangeText={setAsos}
                    placeholderTextColor={colors.muted}
                    placeholder="ASO 2024 - Apto"
                />

                <Text style={[styles.fieldLabel, { marginTop: 10 }]}>
                    Dados de Postura
                </Text>

                <TextInput
                    style={styles.input}
                    value={angulo}
                    onChangeText={setAngulo}
                    placeholderTextColor={colors.muted}
                    placeholder="Ângulo"
                />

                <TextInput
                    style={styles.input}
                    value={classificacaoRisco}
                    onChangeText={setClassificacaoRisco}
                    placeholderTextColor={colors.muted}
                    placeholder="Baixo, Médio ou Alto"
                />

                <Text style={[styles.fieldLabel, { marginTop: 10 }]}>
                    Sessão de Trabalho
                </Text>

                <TextInput
                    style={styles.input}
                    value={inicioTrabalho}
                    onChangeText={setInicioTrabalho}
                    placeholderTextColor={colors.muted}
                    placeholder="07:00:00"
                />

                <TextInput
                    style={styles.input}
                    value={fimTrabalho}
                    onChangeText={setFimTrabalho}
                    placeholderTextColor={colors.muted}
                    placeholder="15:00:00"
                />

                <TextInput
                    style={styles.input}
                    value={tarefas}
                    onChangeText={setTarefas}
                    placeholderTextColor={colors.muted}
                    placeholder="Tarefa 1, Tarefa 2, Tarefa 3"
                />

                <Text style={[styles.fieldLabel, { marginTop: 10 }]}>
                    Risco
                </Text>

                <TextInput
                    style={styles.input}
                    value={comportamento}
                    placeholderTextColor={colors.muted}
                    onChangeText={setComportamento}
                    placeholder="Descrição do comportamento"
                />

                <TextInput
                    style={styles.input}
                    value={usoEpi}
                    onChangeText={setUsoEpi}
                    placeholderTextColor={colors.muted}
                    placeholder="Capacete, Óculos, Luvas"
                />

                <TextInput
                    style={styles.input}
                    value={historico}
                    onChangeText={setHistorico}
                    placeholderTextColor={colors.muted}
                    placeholder="Evento 1, Evento 2"
                />

                <Text style={styles.fieldLabel}>Documentação em Dia</Text>

                <TouchableOpacity
                    style={[
                        styles.saveBtn,
                        {
                            backgroundColor: documentacaoEmDia
                                ? '#16a34a'
                                : '#dc2626',
                            marginBottom: 16
                        }
                    ]}
                    onPress={() => setDocumentacaoEmDia(!documentacaoEmDia)}
                >
                    <Text style={styles.saveBtnText}>
                        {documentacaoEmDia ? 'Sim' : 'Não'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.saveBtn, salvando && styles.saveBtnDisabled]} onPress={handleSalvar} disabled={salvando}>
                    {salvando ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.saveBtnText}>Salvar Colaborador</Text>
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
        marginBottom: 22
    },

    errorBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: colors.dangerBg,
        borderRadius: 12,
        padding: 14,
        marginBottom: 16
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
        marginBottom: 16
    },

    successText: {
        flex: 1,
        color: colors.success,
        fontWeight: '600',
        fontSize: 13
    },

    fieldGroup: {
        marginBottom: 14
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
        borderColor: colors.border,
        marginBottom: 9
    },

    saveBtn: {
        backgroundColor: colors.primary,
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 3
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