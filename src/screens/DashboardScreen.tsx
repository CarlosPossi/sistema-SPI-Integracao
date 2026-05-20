import React from "react";

import { ScrollView, View, Text, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";
import StatBox from "../components/StatBox";
import AlertCard from "../components/AlertCard";
import { colors } from "../theme/colors";

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>SecurtIT</Text>

        <Ionicons name="notifications-outline" size={24} color="#111" />
      </View>

      <View style={styles.row}>
        <StatBox titulo="TEMPERATURA" valor="24.5" unidade="°C" />

        <StatBox
          titulo="RUÍDO"
          valor="68"
          unidade="dB"
          color={colors.warning}
        />
      </View>

      <StatBox titulo="LUMINOSIDADE" valor="450" unidade="LUX" />

      <Card>
        <Text style={styles.section}>MONITORAMENTO 24H</Text>

        <View style={styles.chart}>
          {[50, 80, 100, 120, 150, 170].map((item, index) => (
            <View key={index} style={[styles.bar, { height: item }]} />
          ))}
        </View>
      </Card>

      <Text style={styles.section}>ALERTAS RECENTES</Text>

      <AlertCard
        titulo="Uso incorreto de EPI"
        descricao="Operador sem capacete."
        usoCorretoEPI={false}
        danger="Perigo"
      />

      <AlertCard
        titulo="Vibração Anômala"
        descricao="Oscilação acima de 15 Hz."
        usoCorretoEPI={true}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
  },

  logo: {
    fontSize: 28,
    fontWeight: "700",
  },

  row: {
    flexDirection: "row",
  },

  section: {
    fontWeight: "700",
    marginBottom: 12,
    color: "#444",
  },

  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 200,
  },

  bar: {
    width: 24,
    backgroundColor: "#D6D6D6",
    borderRadius: 8,
  },
});
