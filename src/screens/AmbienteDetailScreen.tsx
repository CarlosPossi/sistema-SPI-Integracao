import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import type { AmbienteStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<AmbienteStackParamList, 'AmbienteDetail'>;

function MetricRow({ icon, label, value, color }: { icon: any; label: string; value: string; color?: string }) {
    return (
        <View style={styles.metricRow}>
            <View style={[styles.metricIcon, { backgroundColor: color ? `${color}20` : colors.softCard }]}>
                <Ionicons name={icon} size={22} color={color ?? colors.primary} />
            </View>
            <View style={styles.metricText}>
                <Text style={styles.metricLabel}>{label}</Text>
                <Text style={styles.metricValue}>{value}</Text>
            </View>
        </View>
    );
}

export default function AmbienteDetailScreen({ route, navigation }: Props) {
    const { ambiente } = route.params;
    const ativo = ambiente.presencaMaquina;

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={22} color={colors.text} />
                <Text style={styles.backText}>Ambientes</Text>
            </TouchableOpacity>

            <View style={styles.headerCard}>
                <Text style={styles.title}>🏭 {ambiente.titulo ?? `Ambiente ${ambiente.id}`}</Text>
                <View style={[styles.machineBadge, ativo ? styles.machineOn : styles.machineOff]}>
                    <Ionicons name={ativo ? 'settings-outline' : 'stop-circle-outline'} size={16} color={ativo ? colors.success : colors.danger} />
                    <Text style={[styles.machineText, { color: ativo ? colors.success : colors.danger }]}>
                        {ativo ? 'Máquina Ativa' : 'Máquina Inativa'}
                    </Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>📊 Dados Ambientais</Text>
                <MetricRow icon="thermometer-outline" label="Temperatura" value={`${ambiente.temperatura} °C`} color={ambiente.temperatura > 30 ? colors.danger : colors.warning} />
                <MetricRow icon="volume-high-outline" label="Ruído" value={`${ambiente.ruido} dB`} color={ambiente.ruido > 85 ? colors.danger : colors.warning} />
                <MetricRow icon="sunny-outline" label="Luminosidade" value={`${ambiente.luminosidade} lux`} color="#EAB308" />
            </View>

            {ambiente.indicadorSeguranca && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>🦺 Indicador de Segurança</Text>
                    <View style={[styles.epiCard, ambiente.indicadorSeguranca.usoCorretoEpi ? styles.epiOk : styles.epiRisk]}>
                        <Ionicons name={ambiente.indicadorSeguranca.usoCorretoEpi ? 'checkmark-circle' : 'warning'} size={28} color={ambiente.indicadorSeguranca.usoCorretoEpi ? colors.success : colors.danger} />
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.epiTitle, { color: ambiente.indicadorSeguranca.usoCorretoEpi ? colors.success : colors.danger }]}>
                                EPI {ambiente.indicadorSeguranca.usoCorretoEpi ? 'Em Conformidade' : 'Com Irregularidade'}
                            </Text>
                            <Text style={styles.epiSub}>Taxa de incidente: {(ambiente.indicadorSeguranca.taxaIncidente * 100).toFixed(1)}%</Text>
                        </View>
                    </View>
                </View>
            )}

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
        marginBottom: 20, 
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
        marginBottom: 16, 
        elevation: 4, 
        borderWidth: 1, 
        borderColor: colors.border 
    },

    title: { 
        fontSize: 24, 
        fontWeight: '800', 
        color: colors.text, 
        marginBottom: 12 
    },

    machineBadge: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        alignSelf: 'flex-start', 
        gap: 8, 
        paddingHorizontal: 14, 
        paddingVertical: 8, 
        borderRadius: 999 
    },

    machineOn: { 
        backgroundColor: colors.successBg 
    },

    machineOff: { 
        backgroundColor: colors.dangerBg 
    },

    machineText: { 
        fontWeight: '700', 
        fontSize: 14 
    },

    section: { 
        backgroundColor: colors.card, 
        borderRadius: 20, 
        padding: 18, 
        marginBottom: 14, 
        borderWidth: 1, 
        borderColor: colors.border 
    },

    sectionTitle: { 
        fontSize: 16, 
        fontWeight: '700', 
        color: colors.text, 
        marginBottom: 16 
    },

    metricRow: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 14, 
        gap: 14 
    },

    metricIcon: { 
        width: 48, 
        height: 48,
        borderRadius: 14, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },

    metricText: { 
        flex: 1 
    },

    metricLabel: { 
        fontSize: 12, 
        color: colors.secondary, 
        fontWeight: '600', 
        marginBottom: 2 
    },

    metricValue: { 
        fontSize: 20, 
        fontWeight: '800', 
        color: colors.text 
    },

    epiCard: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 14, 
        borderRadius: 14, 
        padding: 16 
    },

    epiOk: { 
        backgroundColor: colors.successBg 
    },

    epiRisk: { 
        backgroundColor: colors.dangerBg 
    },

    epiTitle: { 
        fontWeight: '700', 
        fontSize: 15 
    },

    epiSub: { 
        marginTop: 2, 
        color: colors.secondary, 
        fontSize: 13 
    },

    backButton: { 
        backgroundColor: colors.primary, 
        paddingVertical: 14, borderRadius: 14, 
        alignItems: 'center', 
        marginTop: 8 
    },

    backButtonText: { 
        color: '#fff', 
        fontWeight: '700',
        fontSize: 16 
    },
});