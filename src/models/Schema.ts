import fetch from '../util/fetch'
import Table from './Table'
import { config } from '../types'

export default class Schema {
    private config: config
    private schema: string

    constructor(config: config, schema: string) {
        this.config = config
        this.schema = schema
    }

    create(): Promise<Response> {
        const body = {
            operation: 'create_schema',
            schema: this.schema,
        }

        return fetch(JSON.stringify(body), this.config)
    }

    drop(): Promise<Response> {
        const body = {
            operation: 'drop_schema',
            schema: this.schema,
        }

        return fetch(JSON.stringify(body), this.config)
    }

    table(table: string, hash_attribute: string = 'id') {
        return new Table(this.config, this.schema, table, hash_attribute)
    }
}
