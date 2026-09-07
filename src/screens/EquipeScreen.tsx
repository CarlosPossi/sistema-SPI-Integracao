import React, { useState, useCallback } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { listarColaboradores } from '../services/colaboradorService';
import type { Colaborador } from '../types/Colaborador';
import type { EquipeStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<EquipeStackParamList, 'EquipeMain'>;


function getRisco(c: Colaborador) {
    const comp = c.risco?.comportamento ?? '';
    if (comp.toLowerCase().includes('alto')) return { label: 'Alto Risco', cor: colors.danger, bg: colors.dangerBg };
    if (comp.toLowerCase().includes('médio')) return { label: 'Médio Risco', cor: colors.warning, bg: colors.warningBg };
    return { label: 'Seguro', cor: colors.success, bg: colors.successBg };
}

export default function EquipeScreen({ navigation }: Props) {
    const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
    const [erro, setErro] = useState<string | null>(null);
    const [carregando, setCarregando] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            async function carregar() {
                setCarregando(true);
                setErro(null);

                try {
                    const colaboradores = await listarColaboradores();
                    setColaboradores(colaboradores);
                } catch (error) {
                    console.log('Erro ao buscar colaboradores:', error);
                    setColaboradores([]);
                    setErro('Não foi possível carregar a equipe. Verifique se o servidor está disponível.');
                } finally {
                    setCarregando(false);
                }
            }

            carregar();
        }, [])
    );

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text style={styles.title}>Equipe</Text>
                <Text style={styles.subtitle}>{colaboradores.length} colaboradores</Text>
            </View>

            <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('ColaboradorCreate')}>
                <Ionicons name="person-add-outline" size={18} color="#fff" />
                <Text style={styles.addText}>Novo Colaborador</Text>
            </TouchableOpacity>

            {erro && !carregando && (
                <View style={styles.errorBox}>
                    <Ionicons name="alert-circle-outline" size={20} color={colors.danger} />
                    <Text style={styles.errorText}>{erro}</Text>
                </View>
            )}

            {!erro && !carregando && colaboradores.length === 0 && (
                <View style={styles.emptyBox}>
                    <Text style={styles.emptyText}>Nenhum colaborador cadastrado ainda.</Text>
                </View>
            )}

            {colaboradores.map((c) => {
                const risco = getRisco(c);
                return (
                    <TouchableOpacity key={c.id} style={styles.card} onPress={() => navigation.navigate('ColaboradorDetail', { id: c.id })} activeOpacity={0.85}>
                        <View style={styles.cardRow}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>{c.nome.split(' ').map((n) => n[0]).slice(0, 2).join('')}</Text>
                            </View>
                            <View style={styles.cardInfo}>
                                <Text style={styles.name}>{c.nome}</Text>
                                <Text style={styles.cpf}>CPF: {c.cpf}</Text>
                                {c.postura && <Text style={styles.postura}>Postura: {c.postura.angulo}° — {c.postura.classificacaoRiscoErgonomico}</Text>}
                            </View>
                            <View style={[styles.riscoBadge, { backgroundColor: risco.bg }]}>
                                <Text style={[styles.riscoText, { color: risco.cor }]}>{risco.label}</Text>
                            </View>
                        </View>
                        {c.nrs.length > 0 && (
                            <View style={styles.nrsRow}>
                                {c.nrs.map((nr) => (
                                    <View key={nr} style={styles.nrPill}><Text style={styles.nrText}>{nr}</Text></View>
                                ))}
                            </View>
                        )}
                    </TouchableOpacity>
                );
            })}
            <View style={{ height: 24 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 16
    },

    header: {
        marginTop: 54,
        marginBottom: 20
    },

    title: {
        fontSize: 30,
        fontWeight: '800',
        color: colors.text,
        letterSpacing: -0.5
    },

    subtitle: {
        marginTop: 2,
        fontSize: 14,
        color: colors.secondary
    },

    addBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: colors.primary,
        paddingVertical: 13,
        borderRadius: 14,
        marginBottom: 18
    },

    addText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 15
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

    emptyBox: {
        alignItems: 'center',
        paddingVertical: 24
    },

    emptyText: {
        color: colors.secondary,
        fontSize: 14
    },

    card: {
        backgroundColor: colors.card,
        borderRadius: 18,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: colors.border,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.06,
        shadowRadius: 10
    },

    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 8
    },

    avatar: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: colors.warningBg,
        justifyContent: 'center',
        alignItems: 'center'
    },

    avatarText: {
        fontWeight: '800',
        fontSize: 16,
        color: colors.primary
    },

    cardInfo: {
        flex: 1
    },

    name: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.text
    },

    cpf: {
        fontSize: 12,
        color: colors.secondary,
        marginTop: 1
    },

    postura: {
        fontSize: 12,
        color: colors.muted,
        marginTop: 2
    },

    riscoBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 999
    },

    riscoText: {
        fontSize: 11,
        fontWeight: '700'
    },

    nrsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6
    },

    nrPill: {
        backgroundColor: colors.softCard,
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderWidth: 1,
        borderColor: colors.border
    },

    nrText: {
        fontSize: 11,
        fontWeight: '600',
        color: colors.secondary
    },
});