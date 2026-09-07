import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Card from '../components/Card';
import { colors } from '../theme/colors';
import { logoutUser, getUser, StoredUser } from '../data/authStorage';
import { listarColaboradores } from '../services/colaboradorService';
import type { Colaborador } from '../types/Colaborador';

export default function ProfileScreen({ navigation }: any) {
    const [user, setUser] = useState<StoredUser | null>(null);
    const [sessionTime, setSession] = useState(0);
    const [colaborador, setColaborador] = useState<Colaborador | null>(null);
    const [erro, setErro] = useState<string | null>(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        getUser().then(setUser);

        async function carregarColaborador() {
            setCarregando(true);
            setErro(null);

            try {
                const colaboradores = await listarColaboradores();

                if (colaboradores.length > 0) {
                    setColaborador(colaboradores[0]);
                } else {
                    setColaborador(null);
                    setErro('Nenhum colaborador encontrado no servidor.');
                }
            } catch (error) {
                console.log('Erro ao buscar colaborador:', error);
                setColaborador(null);
                setErro('Não foi possível carregar os dados do colaborador. Verifique se o servidor está disponível.');
            } finally {
                setCarregando(false);
            }
        }

        carregarColaborador();

        const timer = setInterval(() => setSession((s) => s + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    function formatTime(s: number) {
        const h = Math.floor(s / 3600).toString().padStart(2, '0');
        const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
        const ss = (s % 60).toString().padStart(2, '0');
        return `${h}:${m}:${ss}`;
    }

    async function handleLogout() {
        await logoutUser();

        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    }

    const postura = colaborador?.postura;
    const sessao = colaborador?.sessaoTrabalho;
    const riscoAlto = colaborador?.risco?.comportamento.toLowerCase().includes('alto');
    const riscoMedio = colaborador?.risco?.comportamento.toLowerCase().includes('médio');
    const riscoColor = riscoAlto ? colors.danger : riscoMedio ? colors.warning : colors.success;
    const riscoBg = riscoAlto ? colors.dangerBg : riscoMedio ? colors.warningBg : colors.successBg;

    const infos = colaborador
        ? [
            { icon: 'person-outline', label: 'Nome', val: colaborador.nome },
            { icon: 'calendar-outline', label: 'Idade', val: `${colaborador.idade} anos` },
            { icon: 'male-female-outline', label: 'Sexo', val: colaborador.sexo },
            { icon: 'card-outline', label: 'CPF', val: colaborador.cpf },
            { icon: 'briefcase-outline', label: 'Contrato', val: colaborador.dataContrato },
        ]
        : [];

    const nomeExibido = user?.nome ?? colaborador?.nome ?? '—';

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <View style={styles.avatarWrapper}>
                    <Text style={styles.avatarText}>
                        {nomeExibido.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                    </Text>
                </View>
                <Text style={styles.name}>{nomeExibido}</Text>
                <Text style={styles.role}>{user?.cargo ?? 'Colaborador'}</Text>
                <View style={styles.onlineBadge}>
                    <View style={styles.onlineDot} />
                    <Text style={styles.onlineText}>Em atividade</Text>
                </View>
            </View>

            {erro && !carregando && (
                <View style={styles.errorBox}>
                    <Ionicons name="alert-circle-outline" size={20} color={colors.danger} />
                    <Text style={styles.errorText}>{erro}</Text>
                </View>
            )}

            {colaborador && (
                <>
                    <Card>
                        <Text style={styles.sectionTitle}>Informações Pessoais</Text>
                        {infos.map(({ icon, label, val }) => (
                            <View key={label} style={styles.infoRow}>
                                <Ionicons name={icon as any} size={18} color={colors.primary} />
                                <View style={styles.infoText}>
                                    <Text style={styles.infoLabel}>{label}</Text>
                                    <Text style={styles.infoValue}>{val}</Text>
                                </View>
                            </View>
                        ))}
                    </Card>

                    <Card>
                        <Text style={styles.sectionTitle}>⏱ Sessão Atual</Text>
                        <View style={styles.timerBox}>
                            <MaterialIcons name="timer" size={28} color={colors.primary} />
                            <Text style={styles.timer}>{formatTime(sessionTime)}</Text>
                        </View>
                        {sessao && <Text style={styles.sessionMeta}>Jornada: {sessao.inicioTrabalho} → {sessao.fimTrabalho}</Text>}
                    </Card>

                    {postura && (
                        <Card>
                            <Text style={styles.sectionTitle}>🧍 Ergonomia</Text>
                            <View style={styles.posturaRow}>
                                <Text style={styles.anguloText}>{postura.angulo}°</Text>
                                <View style={[styles.posturaTag, { backgroundColor: postura.classificacaoRiscoErgonomico === 'Alto' ? colors.dangerBg : postura.classificacaoRiscoErgonomico === 'Médio' ? colors.warningBg : colors.successBg }]}>
                                    <Text style={[styles.posturaTagText, { color: postura.classificacaoRiscoErgonomico === 'Alto' ? colors.danger : postura.classificacaoRiscoErgonomico === 'Médio' ? colors.warning : colors.success }]}>
                                        Risco {postura.classificacaoRiscoErgonomico}
                                    </Text>
                                </View>
                            </View>
                            <Text style={styles.description}>Ângulo corporal de {postura.angulo}° detectado pelo sistema de postura.</Text>
                        </Card>
                    )}

                    <Card>
                        <Text style={styles.sectionTitle}>🦺 Perfil de Segurança</Text>
                        <View style={[styles.riscoPill, { backgroundColor: riscoBg }]}>
                            <Text style={[styles.riscoText, { color: riscoColor }]}>{colaborador.risco?.comportamento ?? 'Sem avaliação'}</Text>
                        </View>
                        <Text style={styles.infoLabel}>EPI necessário</Text>
                        <Text style={styles.infoValue}>{colaborador.risco?.usoEpi ?? '—'}</Text>
                        <Text style={[styles.infoLabel, { marginTop: 12 }]}>NRs Habilitadas</Text>
                        <View style={styles.pillsRow}>
                            {colaborador.nrs.map((nr) => (
                                <View key={nr} style={styles.pill}><Text style={styles.pillText}>{nr}</Text></View>
                            ))}
                        </View>
                    </Card>
                </>
            )}

            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={20} color="#fff" />
                <Text style={styles.logoutText}>Encerrar Sessão</Text>
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

    header: {
        alignItems: 'center',
        marginTop: 54,
        marginBottom: 20
    },

    avatarWrapper: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.warningBg,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12
    },

    avatarText: {
        fontSize: 30,
        fontWeight: '800',
        color: colors.primary
    },

    name: {
        fontSize: 24,
        fontWeight: '800',
        color: colors.text
    },

    role: {
        fontSize: 14,
        color: colors.secondary,
        marginTop: 2
    },

    onlineBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 10,
        backgroundColor: colors.successBg,
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 999
    },

    onlineDot: {
        width: 8,
        height: 8,
        borderRadius: 999,
        backgroundColor: colors.success
    },

    onlineText: {
        color: colors.success,
        fontWeight: '700',
        fontSize: 12
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

    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.text,
        marginBottom: 16
    },

    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
        gap: 12
    },

    infoText: {
        flex: 1
    },

    infoLabel: {
        fontSize: 12,
        color: colors.secondary,
        fontWeight: '600',
        marginBottom: 2
    },

    infoValue: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.text
    },

    timerBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12
    },

    timer: {
        fontSize: 42,
        fontWeight: '800',
        color: colors.primary,
        letterSpacing: 2
    },

    sessionMeta: {
        textAlign: 'center',
        marginTop: 8,
        color: colors.secondary,
        fontSize: 13
    },

    posturaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8
    },

    anguloText: {
        fontSize: 52,
        fontWeight: '800',
        color: colors.primary
    },

    posturaTag: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 999
    },

    posturaTagText: {
        fontWeight: '700',
        fontSize: 14
    },

    description: {
        color: colors.secondary,
        fontSize: 13,
        lineHeight: 20
    },

    riscoPill: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 12,
        marginBottom: 14
    },

    riscoText: {
        fontWeight: '700',
        fontSize: 14
    },

    pillsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 6
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

    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        backgroundColor: '#EF4444',
        paddingVertical: 15,
        borderRadius: 14,
        marginTop: 8
    },

    logoutText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16
    },
});