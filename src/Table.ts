import fetch from './fetch'
import { config, body, condition, record, clauses } from './types'

export default class Table {
    private config: config
    private schema: string
    private table: string
    private hash_attribute: string
    private parameters: {
        where: Array<condition> | null
        select: Array<string>
    }

    constructor(config: config, schema: string, table: string, hash_attribute: string = 'id') {
        this.config = config
        this.schema = schema
        this.table = table
        this.hash_attribute = hash_attribute
        this.parameters = { where: null, select: ['*'] }
    }

    create(): Promise<Response> {
        const body = {
            operation: 'create_table',
            schema: this.schema,
            table: this.table,
            hash_attribute: this.hash_attribute,
        }

        return fetch(JSON.stringify(body), this.config)
    }

    drop(): Promise<Response> {
        const body = {
            operation: 'drop_table',
            schema: this.schema,
            table: this.table,
        }

        return fetch(JSON.stringify(body), this.config)
    }

    where(search_attribute: string, search_value: string): Table
    where(conditions: Array<condition>): Table

    where(search_attribute: string | Array<condition>, search_value?: string): Table {
        if (Array.isArray(search_attribute)) {
            const conditions = search_attribute
            this.parameters.where = conditions
        } else {
            this.parameters.where = [{ search_attribute, search_value }]
        }
        return this
    }

    select(attribute: Array<string>): Table {
        this.parameters.select = attribute
        return this
    }

    getById(id: string | number): Promise<Response>
    getById(ids: Array<string | number>): Promise<Response>

    getById(id: string | number | Array<string | number>): Promise<Response> {
        const body: body = {
            operation: 'search_by_hash',
            schema: this.schema,
            table: this.table,
        }

        if (Array.isArray(id)) {
            body.hash_values = id
        } else {
            body.hash_values = [id]
        }

        body.get_attributes = this.parameters.select

        const response = fetch(JSON.stringify(body), this.config)

        return new Promise((resolve, reject) => {
            try {
                if (response instanceof Array) {
                    resolve(response[0])
                } else {
                    resolve(response)
                }
            } catch (error) {
                reject(error)
            }
        })
    }

    get(clauses: clauses): Promise<Response> {
        const body: body = {
            operation: 'search_by_conditions',
            schema: this.schema,
            table: this.table,
        }

        if (this.parameters.where !== null) {
            body.operator = clauses.operator || 'and'
            body.offset = clauses.offset || 0
            body.limit = clauses.limit || undefined

            body.conditions = this.parameters.where.map((condition: condition) => {
                if (typeof condition.search_type === 'undefined') {
                    return { ...condition, search_type: 'contains' }
                } else {
                    return condition
                }
            })
            body.get_attributes = this.parameters.select

            console.log(body)
        } else {
            return new Promise(() => {
                throw 'Must provide where() with get() statement'
            })
        }

        return fetch(JSON.stringify(body), this.config)
    }

    getAll(): Promise<Response> {
        const body: body = {
            operation: 'search_by_value',
            schema: this.schema,
            table: this.table,
        }

        body.search_attribute = this.hash_attribute
        body.search_value = '*'
        body.get_attributes = this.parameters.select

        return fetch(JSON.stringify(body), this.config)
    }

    insert(data: object): Promise<Response>
    insert(data: Array<object>): Promise<Response>

    insert(data: object | Array<object>): Promise<Response> {
        const body: body = {
            operation: 'insert',
            schema: this.schema,
            table: this.table,
        }

        if (Array.isArray(data)) {
            body.records = data
        } else {
            body.records = [data]
        }

        return fetch(JSON.stringify(body), this.config)
    }

    upsert(data: object): Promise<Response>
    upsert(data: Array<object>): Promise<Response>

    upsert(data: object | Array<object>): Promise<Response> {
        const body: body = {
            operation: 'upsert',
            schema: this.schema,
            table: this.table,
        }

        if (Array.isArray(data)) {
            body.records = data
        } else {
            body.records = [data]
        }

        return fetch(JSON.stringify(body), this.config)
    }

    update(id: string, fields: object): Promise<Response>
    update(record: record): Promise<Response>
    update(records: Array<record>): Promise<Response>

    update(id: string | record | Array<record>, fields?: object): Promise<Response> {
        const body: body = {
            operation: 'update',
            schema: this.schema,
            table: this.table,
            records: [{ id, ...fields }],
        }

        if (Array.isArray(id)) {
            const records = id
            body.records = records
        } else if (typeof id === 'object' && id !== null) {
            const record = id
            body.records = [record]
        } else {
            body.records = [{ id, ...fields }]
        }

        return fetch(JSON.stringify(body), this.config)
    }

    delete(id: string): Promise<Response>
    delete(ids: Array<string>): Promise<Response>

    delete(id: string | Array<string>): Promise<Response> {
        const body: body = {
            operation: 'delete',
            schema: this.schema,
            table: this.table,
        }

        if (Array.isArray(id)) {
            body.hash_values = id
        } else {
            body.hash_values = [id]
        }

        return fetch(JSON.stringify(body), this.config)
    }
}
