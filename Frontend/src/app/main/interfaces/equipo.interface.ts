export interface ApiResponseEquipo {
    status: string;
    data: Equipo[];
}

export interface Equipo {
    id:                string;
    nombre:            string;
    escudo:            string;
    puntos:            number;
    partidos_jugados:  number;
    partidos_ganados:  number;
    partidos_empatados: number;
    partidos_perdidos: number;
    goles_a_favor:     number;
    goles_en_contra:   number;
    diferencia_goles:  number;
    id_liga:           string | null;
}
