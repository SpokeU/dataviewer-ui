export interface Query {
    id?: number,
    name: string,
    queryString: string,
    connectionId?: number
}

export interface QueryResult {
    result: any[]
}

export interface RunQueryRequest {
    connectionId: number,
    queryId?:number,
    queryString: string
}