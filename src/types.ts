export type hash = string | number
export type condition = { search_attribute: string, search_value: any, search_type?: string }
export type record = { id: string, [key: string]: any }
export type clauses = { operator?: string, limit?: number, offset?: number }

export type body = {
    operation: string,
    schema: string,
    table: string,
    records?: Array<object>
    hash_values?: Array<hash>
    search_value?: string
    search_attribute?: string
    get_attributes?: Array<string>,
    operator?: string,
    offset?: number,
    limit?: number | null,
    conditions?: Array<condition>
}

export type config = {
    url: string,
    authorization: string,
    schema?: string,
    table?: {
        name: string,
        hash_attribute: string
    }
}

export type table = {
    parameters: {
        where: Array<condition> | null,
        select: Array<string> | null
    },
    where(search_attribute: string, search_value: string): table,
    wheres(conditions: Array<condition>): table,
    select(attribute: Array<string>): table,
    insert(data: object): Promise<Response>,
    inserts(data: Array<object>): Promise<Response>,
    getById(id: hash): Promise<Response>,
    getByIds(ids: Array<hash>): Promise<Response>,
    get(clauses: clauses): Promise<Response>,
    getAll(): Promise<Response>,
    update(id: string, fields: object): Promise<Response>,
    updates(documents: Array<record>): Promise<Response>,
    delete(id: string | number): Promise<Response>,
    deletes(id: Array<string | number>): Promise<Response>,
}

export type harper = {
    schema: (schema: string) => { table: (table: string, hash_attribute?: string) => table },
    initialize: (config: config) => harper,
    config: config
}
