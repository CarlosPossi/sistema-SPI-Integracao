import React, {useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { inicializarAmbientes } from './src/services/ambienteService';
import { inicializarColaboradores } from './src/services/colaboradorService';

export default function App() {
  useEffect(() => {
    async function inicializarDados() {
      await inicializarAmbientes();
      await inicializarColaboradores();
    }

    inicializarDados();
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  )
}