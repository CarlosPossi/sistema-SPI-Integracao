import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import type { EquipeStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<EquipeStackParamList, 'ColaboradorDetail'>;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return <View style={styles.section}><Text style={styles.sectionTitle}>{title}</Text>{children}</View>;
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    );
}

export default function ColaboradorDetailScreen({ route, navigation }: Props) {
    const { colaborador: c } = route.params;
    const riscoAlto = c.risco?.comportamento.toLowerCase().includes('alto');
    const riscoMedio = c.risco?.comportamento.toLowerCase().includes('médio');
    const riscoColor = riscoAlto ? colors.danger : riscoMedio ? colors.warning : colors.success;
    const riscoBg = riscoAlto ? colors.dangerBg : riscoMedio ? colors.warningBg : colors.successBg;

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={22} color={colors.text} />
                <Text style={styles.backText}>Equipe</Text>
            </TouchableOpacity>

            <View style={styles.headerCard}>
                <View style={styles.avatarLarge}>
                    <Text style={styles.avatarText}>
                        {c.nome
                            .split(' ')
                            .map((n: string) => n[0])
                            .slice(0, 2)
                            .join('')}
                    </Text>
                </View>
                <Text style={styles.nome}>{c.nome}</Text>
                <Text style={styles.cpf}>CPF: {c.cpf}</Text>
                <Text style={styles.meta}>{c.sexo} · {c.idade} anos · Contrato: {c.dataContrato}</Text>
                <View style={[styles.riscoBadge, { backgroundColor: riscoBg }]}>
                    <Text style={[styles.riscoText, { color: riscoColor }]}>{c.risco?.comportamento ?? 'Sem avaliação'}</Text>
                </View>
            </View>

            {c.postura && (
                <Section title="🧍 Postura Ergonômica">
                    <InfoRow label="Ângulo" value={`${c.postura.angulo}°`} />
                    <InfoRow label="Classificação" value={c.postura.classificacaoRiscoErgonomico} />
                </Section>
            )}

            {c.sessaoTrabalho && (
                <Section title="🕐 Sessão de Trabalho">
                    <InfoRow label="Início" value={c.sessaoTrabalho.inicioTrabalho} />
                    <InfoRow label="Fim" value={c.sessaoTrabalho.fimTrabalho} />
                    {c.sessaoTrabalho.tarefas.length > 0 && (
                        <View style={styles.tarefasBox}>
                            <Text style={styles.infoLabel}>Tarefas</Text>
                            {c.sessaoTrabalho.tarefas.map((t: string, i: number) => (
                                <Text key={i} style={styles.tarefaItem}>
                                    • {t}
                                </Text>
                            ))}
                        </View>
                    )}
                </Section>
            )}

            {c.risco && (
                <Section title="⚠️ Perfil de Risco">
                    <InfoRow label="Uso de EPI" value={c.risco.usoEpi} />
                    <InfoRow label="Doc. em dia" value={c.risco.documentacaoEmDia ? 'Sim' : 'Não'} />
                    {c.risco.historico.length > 0 && (
                        <View style={styles.tarefasBox}>
                            <Text style={styles.infoLabel}>Histórico</Text>
                            {c.risco.historico.map((h: string, i: number) => (
                                <Text key={i} style={styles.tarefaItem}>
                                    • {h}
                                </Text>
                            ))}
                        </View>
                    )}
                </Section>
            )}

            <Section title="📋 Documentação">
                <Text style={styles.infoLabel}>NRs Habilitadas</Text>
                <View style={styles.pillsRow}>
                    {c.nrs.map((nr: string) => (
                        <View key={nr} style={styles.pill}>
                            <Text style={styles.pillText}>{nr}</Text>
                        </View>
                    ))}
                </View>
                <Text style={[styles.infoLabel, { marginTop: 14 }]}>ASOs</Text>
                {c.asos.map((aso: string, i: number) => (
                    <Text key={i} style={styles.tarefaItem}>
                        • {aso}
                    </Text>
                ))}
            </Section>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
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
        marginBottom: 16,
        gap: 8
    },

    backText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text
    },

    headerCard: {
        backgroundColor: colors.card,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        marginBottom: 14,
        borderWidth: 1,
        borderColor: colors.border,
        elevation: 4
    },

    avatarLarge: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: colors.warningBg,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12
    },

    avatarText: {
        fontWeight: '800',
        fontSize: 26,
        color: colors.primary
    },

    nome: {
        fontSize: 22,
        fontWeight: '800',
        color: colors.text
    },

    cpf: {
        fontSize: 13,
        color: colors.secondary,
        marginTop: 2
    },

    meta: {
        fontSize: 13,
        color: colors.muted,
        marginTop: 2,
        marginBottom: 12
    },

    riscoBadge: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 999
    },

    riscoText: {
        fontWeight: '700',
        fontSize: 13
    },

    section: {
        backgroundColor: colors.card,
        borderRadius: 18,
        padding: 18,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: colors.border
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.text,
        marginBottom: 14
    },

    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.border
    },

    infoLabel: {
        fontSize: 13,
        color: colors.secondary,
        fontWeight: '600'
    },

    infoValue: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.text
    },

    tarefasBox: {
        marginTop: 10
    },

    tarefaItem: {
        fontSize: 13,
        color: colors.text,
        marginTop: 4,
        lineHeight: 20
    },

    pillsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 8
    },

    pill: {
        backgroundColor: colors.softCard,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: colors.border
    },

    pillText: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.secondary
    },

    backButton: {
        backgroundColor: colors.primary,
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 6
    },

    backButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16
    },
});