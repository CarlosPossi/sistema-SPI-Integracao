import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import Card from "./Card";
import { AlertCardProps } from "../types/AlertCardProps";
import { colors } from "../theme/colors";

export default function AlertCard({
    titulo,
    descricao,
    usoCorretoEPI,
    danger,
}: AlertCardProps) {
    return (
        <Card
            style={{
                borderColor: danger
                    ? colors.danger
                    : colors.border,
            }}
        >
            <View style={styles.row}>
                <View
                    style={[
                        styles.icon,
                        {
                            backgroundColor: danger
                                ? colors.dangerBg
                                : colors.warningBg,
                        },
                    ]}
                />

                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>
                        {titulo}
                    </Text>

                    <Text style={styles.description}>
                        {descricao}
                    </Text>

                    <Text style={styles.usoCorretoEPI}>
                        {usoCorretoEPI}
                    </Text>
                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },

    icon: {
        width: 42,
        height: 42,
        borderRadius: 12,
        marginRight: 12,
    },

    title: {
        fontWeight: "700",
        marginBottom: 4,
    },

    description: {
        color: colors.secondary,
        fontSize: 12,
    },

    usoCorretoEPI: {
        color: colors.secondary,
        fontSize: 12,
    },
});