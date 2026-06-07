import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import type { CardProps } from '../types/CardProps';

export default function Card({ children }: CardProps) {
    return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.card,
        borderRadius: 20,
        padding: 18,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: colors.border,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
    },
});