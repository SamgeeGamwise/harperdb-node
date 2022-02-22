import fetch from '../util/fetch'
import Schema from './Schema'
import { config } from '../types'

export default class Harper {
    private config: config = {
        url: '',
        authorization: '',
    }

    constructor(config: { url: string; authorization: string }) {
        this.config = config
        return this
    }

    schema(schema: string): Schema {
        return new Schema(this.config, schema)
    }

    sql(statement: string): Promise<Response> {
        const body = {
            operation: 'sql',
            sql: statement,
        }

        return fetch(JSON.stringify(body), this.config)
    }
}
