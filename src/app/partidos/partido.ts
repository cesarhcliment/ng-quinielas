export interface Partido {
    id: number,
    jornada: number,
    fecha: string,
    orden: number,
    idlocal: number,
    idvisitante: number,
    goleslocal: number,
    golesvisitante: number
}

export interface PartidoLista {
    id: number,
    jornada: number,
    fecha: string,
    orden: number,
    idlocal: number,
    local: string,
    idvisitante: number,
    visitante: string,
    goleslocal: number,
    golesvisitante: number
}
