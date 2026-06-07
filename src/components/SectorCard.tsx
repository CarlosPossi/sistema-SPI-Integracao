import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import {
    Feather,
    MaterialCommunityIcons,
} from "@expo/vector-icons";

import { colors } from "../theme/colors";
import type { Props } from "../types/CardProps";

export default function SectorCard({
    sector,
}: Props) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>
                {sector.titulo}
            </Text>

            <View style={styles.metricsRow}>
                <View style={styles.metricCard}>
                    <View style={styles.iconBox}>
                        <Feather
                            name="thermometer"
                            size={22}
                            color={colors.warning}
                        />
                    </View>

                    <Text style={styles.metricLabel}>
                        TEMPERATURA
                    </Text>

                    <Text style={styles.metricValue}>
                        {sector.temperatura}°C
                    </Text>
                </View>

                <View style={styles.metricCard}>
                    <View style={styles.iconBox}>
                        <Feather
                            name="volume-2"
                            size={22}
                            color={colors.warning}
                        />
                    </View>

                    <Text style={styles.metricLabel}>
                        RUÍDO
                    </Text>

                    <Text style={styles.metricValue}>
                        {sector.ruido} dB
                    </Text>
                </View>

                <View style={styles.metricCard}>
                    <View style={styles.iconBox}>
                        <MaterialCommunityIcons
                            name="white-balance-sunny"
                            size={22}
                            color="#EAB308"
                        />
                    </View>

                    <Text style={styles.metricLabel}>
                        LUMINOSIDADE
                    </Text>

                    <Text style={styles.metricValue}>
                        {sector.luminosidade} lux
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.card,
        borderRadius: 28,
        padding: 18,
        marginBottom: 18,

        borderWidth: 1,
        borderColor: "#E5E7EB",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,

        elevation: 4,
    },

    title: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.text,
        marginBottom: 16,
    },

    metricsRow: {
        flexDirection: "row",
        gap: 12,
    },

    metricCard: {
        flex: 1,

        backgroundColor: "#F8FAFC",

        borderRadius: 22,
        paddingVertical: 20,
        paddingHorizontal: 12,

        borderWidth: 1,
        borderColor: "#E2E8F0",

        alignItems: "center",
    },

    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 999,

        backgroundColor: "#FFF7ED",

        justifyContent: "center",
        alignItems: "center",

        marginBottom: 12,
    },

    metricLabel: {
        fontSize: 11,
        fontWeight: "600",
        color: colors.secondary,
        letterSpacing: 1,
        marginBottom: 8,
    },

    metricValue: {
        fontSize: 24,
        fontWeight: "800",
        color: colors.text,
    },
});