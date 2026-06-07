import { Risco } from "./Risco";
import { Postura } from "./Postura";
import { SessaoTrabalho } from "./SessaoTrabalho";

export interface Colaborador {
    id: number;
    nome: string;
    idade: number;
    cpf: string;
    dataContrato: string;
    nrs: string[];
    asos: string[];
    sexo: string;
    postura?: Postura;
    sessaoTrabalho?: SessaoTrabalho;
    risco?: Risco;
}
