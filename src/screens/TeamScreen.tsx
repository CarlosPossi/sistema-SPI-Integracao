import React from "react";

import {
    ScrollView,
    Text,
    StyleSheet,
} from "react-native";

import Card from "../components/Card";
import { Worker } from "../types/Worker";
import { colors } from "../theme/colors";

const workers: Worker[] = [
    {
        id: 1,
        nome: "Ricardo Mendes",
        funcao: "Operador",
        risco: true,
    },

    {
        id: 2,
        nome: "Ana Paula",
        funcao: "Manutenção",
        risco: false,
    },

    {
        id: 3,
        nome: "Marcos Oliveira",
        funcao: "Soldador",
        risco: false,
    },
];

export default function TeamScreen() {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>
                Quadro de Operadores
            </Text>

            {workers.map((worker) => (
                <Card key={worker.id}>
                    <Text style={styles.name}>
                        {worker.nome}
                    </Text>

                    <Text style={styles.role}>
                        {worker.funcao}
                    </Text>

                    <Text style={styles.badge}>
                        {worker.risco}
                    </Text>
                </Card>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 16,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        marginTop: 50,
        marginBottom: 20,
    },

    name: {
        fontSize: 18,
        fontWeight: "700",
    },

    role: {
        marginTop: 4,
        color: colors.secondary,
    },

    badge: {
        marginTop: 12,
        alignSelf: "flex-start",
        backgroundColor: colors.warningBg,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        color: "#92400E",
        fontWeight: "700",
    },
});