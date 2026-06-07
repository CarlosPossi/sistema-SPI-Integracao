import { IndicadorSeguranca } from "./IndicadorSeguranca";

export interface Ambiente {
    id: number;
    temperatura: number;
    ruido: number;
    luminosidade: number;
    presencaMaquina: boolean;
    indicadorSeguranca?: IndicadorSeguranca;
    titulo?: string;
}