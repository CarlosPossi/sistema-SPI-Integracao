import { Risco } from "../types/Risco";

export const MOCK_RISCOS: Risco[] = [
    {
        id: 1,
        comportamento: 'Alto risco — área de maquinário pesado',
        usoEpi: 'Capacete, luvas, óculos de proteção',
        historico: ['2024-03-10: Incidente leve', '2024-11-22: Alerta de postura'],
        documentacaoEmDia: true,
    },
    {
        id: 2,
        comportamento: 'Baixo risco — operação padrão',
        usoEpi: 'Óculos de proteção',
        historico: [],
        documentacaoEmDia: true,
    },
    {
        id: 3,
        comportamento: 'Médio risco — exposição a ruído elevado',
        usoEpi: 'Protetor auricular, capacete',
        historico: ['2025-01-15: Aviso de EPI incorreto'],
        documentacaoEmDia: false,
    },
];