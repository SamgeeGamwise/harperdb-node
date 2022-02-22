import node_fetch, { RequestInit, Headers } from 'node-fetch'
import { config } from '../types'

export default async function fetch(body: string, config: config): Promise<Response> {
    const headers: Headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', config.authorization)

    const request: RequestInit = {
        method: 'POST',
        headers,
        body,
        redirect: 'follow',
    }

    return node_fetch(config.url, request)
        .then((response: any) => response.json())
        .then((response: any) => response)
        .catch((err: any) => err)
}
