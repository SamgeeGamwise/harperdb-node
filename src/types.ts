import { type } from 'os'

export type hash = string | number
export type condition = { search_attribute: string; search_value: any; search_type?: string }
export type record = { id: string; [key: string]: any }
export type clauses = { operator?: string; limit?: number; offset?: number }

export type body = {
    operation: string
    schema: string
    table: string
    records?: Array<object>
    hash_values?: Array<hash>
    search_value?: string
    search_attribute?: string
    get_attributes?: Array<string>
    operator?: string
    offset?: number
    limit?: number | null
    conditions?: Array<condition>
}

export type config = {
    url: string
    authorization: string
}
