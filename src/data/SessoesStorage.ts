import { SessaoTrabalho } from "../types/SessaoTrabalho";

export const MOCK_SESSOES: SessaoTrabalho[] = [
    {
        id: 1,
        inicioTrabalho: '07:00:00',
        fimTrabalho: '15:00:00',
        tarefas: ['Operação de torno CNC', 'Inspeção de peças', 'Limpeza da área'],
    },
    {
        id: 2,
        inicioTrabalho: '08:00:00',
        fimTrabalho: '17:00:00',
        tarefas: ['Montagem de componentes', 'Teste de qualidade'],
    },
    {
        id: 3,
        inicioTrabalho: '06:00:00',
        fimTrabalho: '14:00:00',
        tarefas: ['Soldagem', 'Acabamento superficial', 'Relatório de produção'],
    },
];