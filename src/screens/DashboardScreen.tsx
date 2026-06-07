import React, { useState, useCallback } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';
import StatBox from '../components/StatBox';
import AlertCard from '../components/AlertCard';
import { colors } from '../theme/colors';
import { MOCK_MONITORAMENTO } from '../data/MonitoramentoStorage';
import { MOCK_ALERTAS } from '../data/AlertaStorage';
import { MOCK_AMBIENTES } from '../data/AmbienteStorage';

const GRAPH_HEIGHT = 160;

export default function DashboardScreen() {
  const [monitoramento, setMonitoramento] = useState(MOCK_MONITORAMENTO);
  const [alertas, setAlertas] = useState(MOCK_ALERTAS);
  const [ambiente, setAmbiente] = useState(MOCK_AMBIENTES[0]);

  useFocusEffect(
    useCallback(() => {
      setMonitoramento(MOCK_MONITORAMENTO);
      setAlertas(MOCK_ALERTAS);
      setAmbiente(MOCK_AMBIENTES[0]);
    }, [])
  );

  const maxVal = Math.max(...monitoramento.map((i) => i.valor), 1);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>🛡️ SecurtIT</Text>
          <Text style={styles.subtitle}>Monitoramento Industrial</Text>
        </View>
        <View style={styles.onlineBadge}>
          <View style={styles.onlineDot} />
          <Text style={styles.onlineText}>Ao vivo</Text>
        </View>
      </View>

      <View style={styles.row}>
        <StatBox titulo="TEMPERATURA" valor={String(ambiente.temperatura)} unidade="°C" icon="thermometer-outline" color={colors.danger} />
        <StatBox titulo="RUÍDO" valor={String(ambiente.ruido)} unidade="dB" icon="volume-high-outline" color={colors.warning} />
      </View>

      <StatBox titulo="LUMINOSIDADE" valor={String(ambiente.luminosidade)} unidade="lux" icon="sunny-outline" color={colors.primary} />

      <View style={[styles.machineBadge, ambiente.presencaMaquina ? styles.machineOn : styles.machineOff]}>
        <Ionicons
          name={ambiente.presencaMaquina ? 'settings-outline' : 'stop-circle-outline'}
          size={18}
          color={ambiente.presencaMaquina ? colors.success : colors.danger}
        />
        <Text style={[styles.machineText, { color: ambiente.presencaMaquina ? colors.success : colors.danger }]}>
          {ambiente.presencaMaquina ? 'Máquina Ativa' : 'Máquina Inativa'} — {ambiente.titulo}
        </Text>
      </View>

      <Card>
        <Text style={styles.sectionLabel}>MONITORAMENTO 24H</Text>
        <View style={styles.chartContainer}>
          <View style={styles.yAxis}>
            {[200, 150, 100, 50, 0].map((v) => (
              <Text key={v} style={styles.axisText}>{v}</Text>
            ))}
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={[styles.chart, { height: GRAPH_HEIGHT }]}>
              {monitoramento.map((item, i) => (
                <View key={i} style={styles.barWrapper}>
                  <View style={[styles.bar, { height: (item.valor / maxVal) * GRAPH_HEIGHT }]} />
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </Card>

      <Text style={styles.alertTitle}>🚨 Alertas Recentes</Text>
      {alertas.map((alerta, i) => (
        <AlertCard key={i} titulo={alerta.titulo} descricao={alerta.descricao} usoCorretoEPI={alerta.usoCorretoEPI} />
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
    marginBottom: 20, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start' 
  },

  logo: { 
    fontSize: 28, 
    fontWeight: '800', 
    color: colors.text, 
    letterSpacing: -0.5 
  },

  subtitle: { 
    marginTop: 2, 
    fontSize: 14, 
    color: colors.secondary 
  },

  onlineBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: colors.successBg, 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 999, 
    gap: 6 
  },

  onlineDot: { 
    width: 8, 
    height: 8, 
    borderRadius: 999, 
    backgroundColor: colors.success 
  },

  onlineText: { 
    fontSize: 12, 
    fontWeight: '700', 
    color: colors.success 
  },

  row: { 
    flexDirection: 'row', 
    gap: 12, 
    marginBottom: 12 
  },

  machineBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8, 
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    borderRadius: 12, 
    marginBottom: 16 
  },

  machineOn: { 
    backgroundColor: colors.successBg 
  },

  machineOff: { 
    backgroundColor: colors.dangerBg 
  },

  machineText: { 
    fontSize: 13, 
    fontWeight: '700' 
  },

  sectionLabel: { 
    fontSize: 12, 
    fontWeight: '700', 
    letterSpacing: 1.2, 
    color: colors.secondary, 
    marginBottom: 20 
  },

  chartContainer: { 
    flexDirection: 'row', 
    height: GRAPH_HEIGHT + 30 
  },

  yAxis: { 
    width: 36, 
    height: GRAPH_HEIGHT, 
    justifyContent: 'space-between', 
    alignItems: 'flex-end', 
    marginRight: 8 
  },

  axisText: { 
    fontSize: 11, 
    fontWeight: '600', 
    color: colors.muted 
  },

  chart: { 
    flexDirection: 'row', 
    alignItems: 'flex-end', 
    gap: 8, 
    paddingRight: 8 
  },

  barWrapper: { 
    width: 34, 
    alignItems: 'center', 
    justifyContent: 'flex-end' 
  },

  bar: { 
    width: 24, 
    backgroundColor: colors.graph, 
    borderTopLeftRadius: 8, 
    borderTopRightRadius: 8 
  },

  barLabel: { 
    marginTop: 4, 
    fontSize: 9, 
    color: colors.muted, 
    fontWeight: '600' 
  },

  alertTitle: { 
    marginTop: 8, 
    marginBottom: 12, 
    fontSize: 18, 
    fontWeight: '700', 
    color: colors.text 
  },
});