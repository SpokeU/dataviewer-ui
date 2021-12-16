export interface Connection {
    id: number,
    name: string,
    type: string,
    host: string,
    port: number,
    database: string,
    username: string,
    password: string
}

export interface ConnectionParameter {
    key: string,
    type: string
}

export enum ConnectionType {
    MONGO,
    POSTGRES
}