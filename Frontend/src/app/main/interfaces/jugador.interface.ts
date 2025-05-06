export interface ApiResponseJugador {
    status: string;
    data:   Jugador[];
}

export interface Jugador {
    id:               string;
    nombre:           string;
    apellidos:        string;
    imagen:           null;
    goles:            number;
    asistencias:      number;
    dorsal:           number;
    partidos_jugados: number;
    id_equipo:        string | null;
    nombre_equipo:    string | null;
}
