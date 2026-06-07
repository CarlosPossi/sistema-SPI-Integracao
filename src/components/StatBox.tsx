import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import type { StatBoxProps } from '../types/StatBoxProps';

export default function StatBox({ titulo, valor, unidade, color = colors.text, icon }: StatBoxProps) {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>{titulo}</Text>
                <View style={[styles.iconBox, { backgroundColor: `${color}18` }]}>
                    <Ionicons name={icon} size={18} color={color} />
                </View>
            </View>
            <View style={styles.valueRow}>
                <Text style={[styles.value, { color }]}>{valor}</Text>
                <Text style={styles.unit}>{unidade}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: colors.card,
        borderRadius: 20,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: colors.border,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 3 },
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },

    title: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1,
        color: colors.secondary,
    },

    iconBox: {
        width: 34,
        height: 34,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    valueRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 4,
    },

    value: {
        fontSize: 30,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    
    unit: {
        fontSize: 14,
        color: colors.secondary,
        marginBottom: 4,
    },
});