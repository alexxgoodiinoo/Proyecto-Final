export interface ApiResponseUsuario {
    status: string;
    data:   Usuario[];
}

export interface Usuario {
    id:             string;
    username:       string;
    password:       string;
    email:          string;
    tipo_usuario:   string;
    id_equipo:      null | string;
    nombre_equipo:  null | string;
}
