export interface ApiResponsePartido {
    status: string;
    data:   Partido[];
}

export interface Partido {
    id:               string;
    fecha:            Date;
    resultado:        string;
    equipo_local:     null | string;
    equipo_visitante:     null | string;
    nombre_equipo_local:     null | string;
    nombre_equipo_visitante: null | string;
    hora:             string;
}
