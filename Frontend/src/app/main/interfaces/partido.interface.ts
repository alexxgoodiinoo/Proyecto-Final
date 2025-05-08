export interface ApiResponsePartido {
    status: string;
    data:   Partido[];
}

export interface Partido {
    id:                      string;
    fecha:                   string | null;
    resultado:               string | null;
    equipo_local:            string | null;
    equipo_visitante:        string | null;
    nombre_equipo_local:     string | null;
    escudo_equipo_local:     string | null;
    nombre_equipo_visitante: string | null;
    escudo_equipo_visitante: string | null;
    hora:                    string | null;
}
