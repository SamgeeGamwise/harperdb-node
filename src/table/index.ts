import fetch from "../fetch"
import { config, hash, table, body, condition, record, clauses } from "../types"

export default (schema: string, config: config): (table: string, hash_attribute?: string) => table => {
    return (table: string, hash_attribute: string = "id"): table => {
        config.table = { name: table, hash_attribute }

        return {
            parameters: {
                where: null,
                select: null
            },
            where(search_attribute: string, search_value: string): table {
                this.parameters.where = [{ search_attribute, search_value }]
                return this
            },
            wheres(conditions: Array<condition>): table {
                this.parameters.where = conditions
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

                return fetch(JSON.stringify(body), config)
            },
            inserts(data: Array<object>): Promise<Response> {

                const body: body = {
                    operation: "insert",
                    schema,
                    table,
                    records: data
                }

                return fetch(JSON.stringify(body), config)
            },
            getById(hash_value: hash): Promise<Response> {
                const body: body = {
                    operation: "search_by_hash",
                    schema,
                    table,
                    hash_values: [hash_value]
                }
                body.get_attributes = this.parameters.select || ["*"]

                const response = fetch(JSON.stringify(body), config)

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
            },
            getByIds(hash_values: Array<hash>): Promise<Response> {
                const body: body = {
                    operation: "search_by_hash",
                    schema,
                    table,
                    hash_values
                }

                return fetch(JSON.stringify(body), config)
            },
            get(clauses: clauses): Promise<Response> {
                const body: body = {
                    operation: "search_by_conditions",
                    schema,
                    table,
                }

                if (this.parameters.where !== null) {
                    body.operator = clauses.operator || "and"
                    body.offset = clauses.offset || 0
                    body.limit = clauses.limit || undefined


                    body.conditions = this.parameters.where.map((condition: condition) => {
                        if (typeof condition.search_type === "undefined") {
                            return { ...condition, search_type: "contains" }
                        } else {
                            return condition
                        }
                    })
                    body.get_attributes = this.parameters.select || ["*"]

                    console.log(body)

                } else {
                    return new Promise(() => {
                        throw "Must provide where() with get() statement"
                    })
                }

                return fetch(JSON.stringify(body), config)
            },
            getAll(): Promise<Response> {
                const body: body = {
                    operation: "search_by_value",
                    schema,
                    table,
                }

                body.search_attribute = hash_attribute || "id"
                body.search_value = "*"
                body.get_attributes = this.parameters.select || ["*"]

                return fetch(JSON.stringify(body), config)
            },
            update(id: string, fields: object): Promise<Response> {
                const body: body = {
                    operation: "update",
                    schema,
                    table,
                    records: [{ id, ...fields }]
                }
                return fetch(JSON.stringify(body), config)
            },
            updates(records: Array<record>): Promise<Response> {
                const body: body = {
                    operation: "update",
                    schema,
                    table,
                    records
                }
                return fetch(JSON.stringify(body), config)
            },
            delete(id: string): Promise<Response> {
                const body: body = {
                    operation: "delete",
                    schema,
                    table,
                    hash_values: [id]
                }
                return fetch(JSON.stringify(body), config)
            },
            deletes(ids: Array<string>): Promise<Response> {
                const body: body = {
                    operation: "delete",
                    schema,
                    table,
                    hash_values: ids
                }

                return fetch(JSON.stringify(body), config)
            }
        }
    }
}
