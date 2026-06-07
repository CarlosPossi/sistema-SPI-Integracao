export interface CardProps {
    children: React.ReactNode;
}

export interface Sector {
    titulo: string;
    temperatura: number;
    ruido: number;
    luminosidade: number;
}

export interface Props {
    sector: Sector;
}