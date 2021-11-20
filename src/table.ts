import fetch, { Headers, RequestInit } from "node-fetch"
import { config, hash, table, body } from "./types"

export default function (schema: string, config: config): (table: string) => table {
    const headers: Headers = new Headers()
    headers.append("Content-Type", "application/json")
    headers.append("Authorization", config.authorization)

    return (table: string): table => {
        return {
            parameters: {
                where: null,
                select: null
            },
            where(attribute: string, value: string): table {
                this.parameters.where = { attribute, value }
                return this
            },
            select(attribute: Array<string>): table {
                this.parameters.select = attribute
                return this
            },
            insert(data: object): Promise<Response> {
                const body: body = {
                    operation: "insert",
                    schema,
                    table,
                    records: [data]
                }

                return fetchDb(JSON.stringify(body))
            },
            inserts(data: Array<object>): Promise<Response> {

                const body: body = {
                    operation: "insert",
                    schema,
                    table,
                    records: data
                }

                return fetchDb(JSON.stringify(body))
            },
            getById(hash_value: hash): Promise<Response> {
                const body: body = {
                    operation: "search_by_hash",
                    schema,
                    table,
                    hash_values: [hash_value]
                }

                if (this.parameters.select !== null) {
                    body.get_attributes = this.parameters.select
                }
                return fetchDb(JSON.stringify(body))
            },
            getByIds(hash_values: Array<hash>): Promise<Response> {
                const body: body = {
                    operation: "search_by_hash",
                    schema,
                    table,
                    hash_values
                }

                return fetchDb(JSON.stringify(body))
            },
            get(): Promise<Response> {
                const body: body = {
                    operation: "search_by_value",
                    schema,
                    table,
                }

                if (this.parameters.where !== null && this.parameters.select !== null) {
                    body.search_attribute = this.parameters.where.attribute
                    body.search_value = this.parameters.where.value
                    body.get_attributes = this.parameters.select
                } else {
                    return new Promise(() => {
                        throw "Must provide where() and select() with get() statement"
                    })
                }
                return fetchDb(JSON.stringify(body))
            },
            delete(hash_value: string) {
                const body: body = {
                    operation: "delete",
                    schema,
                    table,
                    hash_values: [hash_value]
                }

                return fetchDb(JSON.stringify(body))
            },
            deletes(hash_values: Array<string>) {
                const body: body = {
                    operation: "delete",
                    schema,
                    table,
                    hash_values
                }

                return fetchDb(JSON.stringify(body))
            }
        }
    }


    function fetchDb(body: string): Promise<Response> {
        const request: RequestInit = {
            method: 'POST',
            headers,
            body,
            redirect: 'follow'
        }

        return fetch(config.url, request)
            .then((response: any) => response.json())
            .then((response: any) => response)
            .catch((err: any) => err)
    }
}
