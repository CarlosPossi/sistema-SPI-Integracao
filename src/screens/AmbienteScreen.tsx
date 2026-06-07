import React, { useState, useCallback } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { listarAmbientes } from '../services/ambienteService';
import type { Ambiente } from '../types/Ambiente';
import type { AmbienteStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<AmbienteStackParamList, 'AmbienteMain'>;

function getRuidoColor(r: number) { return r > 100 ? colors.danger : r > 80 ? colors.warning : colors.success; }
function getTempColor(t: number) { return t > 30 ? colors.danger : t > 26 ? colors.warning : colors.success; }

export default function AmbienteScreen({ navigation }: Props) {
    const [ambientes, setAmbientes] = useState<Ambiente[]>([]);

    useFocusEffect(
        useCallback(() => {
            async function carregar() {
                const ambientes = await listarAmbientes();

                console.log('AMBIENTES:', ambientes);

                setAmbientes(ambientes);
            }

            carregar();
        }, [])
    );

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text style={styles.title}>Monitoramento{'\n'}Ambiental</Text>
                <Text style={styles.subtitle}>Sensores em tempo real</Text>
            </View>

            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AmbienteCreate')}>
                <Ionicons name="add-circle-outline" size={20} color="#fff" />
                <Text style={styles.addText}>Novo Registro</Text>
            </TouchableOpacity>

            {ambientes.map((amb) => (
                <TouchableOpacity key={amb.id} onPress={() => navigation.navigate('AmbienteDetail', { ambiente: amb })} activeOpacity={0.85}>
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>🏭 {amb.titulo ?? `Ambiente ${amb.id}`}</Text>
                            <View style={[styles.statusPill, amb.presencaMaquina ? styles.pillOn : styles.pillOff]}>
                                <Text style={[styles.pillText, { color: amb.presencaMaquina ? colors.success : colors.danger }]}>
                                    {amb.presencaMaquina ? 'Ativa' : 'Inativa'}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.metrics}>
                            <View style={styles.metricItem}>
                                <Ionicons name="thermometer-outline" size={18} color={getTempColor(amb.temperatura)} />
                                <Text style={styles.metricValue}>{amb.temperatura}°C</Text>
                                <Text style={styles.metricLabel}>Temp.</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.metricItem}>
                                <Ionicons name="volume-high-outline" size={18} color={getRuidoColor(amb.ruido)} />
                                <Text style={styles.metricValue}>{amb.ruido} dB</Text>
                                <Text style={styles.metricLabel}>Ruído</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.metricItem}>
                                <Ionicons name="sunny-outline" size={18} color="#EAB308" />
                                <Text style={styles.metricValue}>{amb.luminosidade}</Text>
                                <Text style={styles.metricLabel}>lux</Text>
                            </View>
                        </View>

                        {amb.indicadorSeguranca && (
                            <View style={[styles.epiRow, amb.indicadorSeguranca.usoCorretoEpi ? styles.epiOk : styles.epiRisk]}>
                                <Ionicons name={amb.indicadorSeguranca.usoCorretoEpi ? 'checkmark-circle' : 'warning'} size={14} color={amb.indicadorSeguranca.usoCorretoEpi ? colors.success : colors.danger} />
                                <Text style={[styles.epiText, { color: amb.indicadorSeguranca.usoCorretoEpi ? colors.success : colors.danger }]}>
                                    EPI {amb.indicadorSeguranca.usoCorretoEpi ? 'em conformidade' : 'com irregularidade'} — taxa: {(amb.indicadorSeguranca.taxaIncidente * 100).toFixed(0)}%
                                </Text>
                            </View>
                        )}

                        <View style={styles.cardFooter}>
                            <Text style={styles.detailsLink}>Ver detalhes</Text>
                            <Ionicons name="chevron-forward" size={16} color={colors.primary} />
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
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
        letterSpacing: -0.5,
        lineHeight: 36
    },

    subtitle: {
        marginTop: 4,
        fontSize: 14,
        color: colors.secondary
    },

    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: colors.primary,
        paddingVertical: 13,
        borderRadius: 14,
        marginBottom: 20
    },

    addText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 15
    },

    card: {
        backgroundColor: colors.card,
        borderRadius: 20,
        padding: 18,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: colors.border,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 12
    },

    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.text,
        flex: 1
    },

    statusPill: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999
    },

    pillOn: {
        backgroundColor: colors.successBg
    },

    pillOff: {
        backgroundColor: colors.dangerBg
    },

    pillText: {
        fontSize: 12,
        fontWeight: '700'
    },

    metrics: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.softCard,
        borderRadius: 14,
        paddingVertical: 14,
        paddingHorizontal: 8,
        marginBottom: 12
    },

    metricItem: {
        flex: 1,
        alignItems: 'center',
        gap: 4
    },

    metricValue: {
        fontSize: 17,
        fontWeight: '800',
        color: colors.text
    },

    metricLabel: {
        fontSize: 11,
        color: colors.secondary,
        fontWeight: '600'
    },

    divider: {
        width: 1,
        height: 40,
        backgroundColor: colors.border
    },

    epiRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 8,
        marginBottom: 12
    },

    epiOk: {
        backgroundColor: colors.successBg
    },

    epiRisk: {
        backgroundColor: colors.dangerBg
    },

    epiText: {
        fontSize: 12,
        fontWeight: '600',
        flex: 1
    },

    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 4
    },

    detailsLink: {
        color: colors.primary,
        fontWeight: '700',
        fontSize: 13
    },
});