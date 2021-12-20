export interface Connection {
    id: number,
    name: string,
    type: string,
    connectionDetails: {}
}

export interface ConnectionParameter {
    key: string,
    type: string
}

export enum ConnectionType {
    MONGO,
    POSTGRES
}