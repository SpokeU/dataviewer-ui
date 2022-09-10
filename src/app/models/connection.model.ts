export interface Connection {
    id: number,
    name: string,
    type: string,
    details: {}
}

export interface ConnectionParameter {
    key: string,
    type: string
}

export enum ConnectionType {
    MONGO,
    POSTGRES
}

export interface ConnectionTestResult {
    success: boolean,
    message: string
}