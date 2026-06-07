import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';
import { colors } from '../theme/colors';
import type { AlertCardProps } from '../types/AlertCardProps';

export default function AlertCard({ titulo, descricao, usoCorretoEPI }: AlertCardProps) {
    const ok = usoCorretoEPI;
    return (
        <Card>
            <View style={styles.container}>
                <View style={[styles.iconBox, { backgroundColor: ok ? colors.successBg : colors.dangerBg }]}>
                    <Ionicons
                        name={ok ? 'checkmark-circle' : 'warning'}
                        size={28}
                        color={ok ? colors.success : colors.danger}
                    />
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>{titulo}</Text>
                    <Text style={styles.description}>{descricao}</Text>
                </View>
                <View style={[styles.dot, { backgroundColor: ok ? colors.success : colors.danger }]} />
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    iconBox: {
        width: 52,
        height: 52,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },

    content: { flex: 1 },
    title: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.text,
    },

    description: {
        marginTop: 3,
        color: colors.secondary,
        fontSize: 13,
        lineHeight: 18,
    },

    dot: {
        width: 8,
        height: 8,
        borderRadius: 999,
        marginLeft: 8,
    },
});