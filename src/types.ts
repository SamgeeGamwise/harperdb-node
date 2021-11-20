export type config = {
    url: string,
    authorization: string
}

export type table = {
    parameters: {
        where: { attribute: string, value: string } | null,
        select: Array<string> | null
    },
    where(attribute: string, value: string): table,
    select(attribute: Array<string>): table,
    insert(data: object): Promise<Response>,
    inserts(data: Array<object>): Promise<Response>,
    getById(hash_value: hash): Promise<Response>,
    getByIds(hash_values: Array<hash>): Promise<Response>,
    get(): Promise<Response>,
    delete(hash_value: string | number): Promise<Response>,
    deletes(hash_values: Array<string | number>): Promise<Response>,
}

export type harper = {
    schema: (schema: string) => { table: (table: string) => table },
    initialize: (config: config) => harper,
    config: config
}

export type body = {
    operation: string,
    schema: string,
    table: string,
    records?: Array<object>
    hash_values?: Array<hash>
    search_value?: string
    search_attribute?: string
    get_attributes?: Array<string>
}

export type hash = string | number
