export interface Query {
    id: number,
    name: string,
    queryString: string,
    connectionId: number
}

export interface QueryResult {
    data: any[]
}