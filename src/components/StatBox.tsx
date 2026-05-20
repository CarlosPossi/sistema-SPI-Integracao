import React from "react";
import {
    View,
    Text,
    StyleSheet,
}from "react-native";

import { StatBoxProps } from "../types/StatBoxProps";
import { colors } from "../theme/colors";

export default function StatBox ({
    titulo,
    valor,
    unidade,
    color = colors.text,
}: StatBoxProps){
    return (
        <View style={styles.box}>
            <Text style={styles.title}>{titulo}</Text>

            <View style={styles.row}>
                <Text style = {[styles.value, {color}]}>
                    {valor}
                </Text>

                <Text style={styles.unit}>{unidade}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create ({
    box: {
        flex: 1,
        backgroundColor: "#F8F8F8",
        borderRadius: 12,
        padding: 14,
        margin: 4,
    },

    title: {
        fontSize: 10,
        letterSpacing: 1,
        color: colors.secondary,
        marginBottom: 10,
    },

    row: {
        flexDirection: "row",
        alignItems: "flex-end",
    },

    value: {
        fontSize: 30,
        fontWeight: "700",
    },

    unit: {
        marginLeft: 4,
        marginBottom: 4,
        color: colors.secondary,
    },
});