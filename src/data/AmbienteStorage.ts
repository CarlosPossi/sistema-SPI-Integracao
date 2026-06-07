import { Ambiente } from "../types/Ambiente";
import { MOCK_INDICADORES } from "./IndicadoresStorage";

export const MOCK_AMBIENTES: Ambiente[] = [
    {
        id: 1,
        titulo: 'Setor de Usinagem',
        temperatura: 24.5,
        ruido: 92,
        luminosidade: 450,
        presencaMaquina: true,
        indicadorSeguranca: MOCK_INDICADORES[0],
    },
    {
        id: 2,
        titulo: 'Linha de Montagem',
        temperatura: 22.1,
        ruido: 65,
        luminosidade: 500,
        presencaMaquina: false,
        indicadorSeguranca: MOCK_INDICADORES[2],
    },
    {
        id: 3,
        titulo: 'Caldeiraria',
        temperatura: 31.0,
        ruido: 110,
        luminosidade: 320,
        presencaMaquina: true,
        indicadorSeguranca: MOCK_INDICADORES[1],
    },
];