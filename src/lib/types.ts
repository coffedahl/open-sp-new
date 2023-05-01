export interface Product {
    artnr?: string,
    title?: string,
    bullet: string[],
    current?: string,
    previous?: string
}
export interface RunRequest {
    store: string,
    type: 'price' | 'sign'
}

export interface Session {
    id: string
    storenumber: string
    expires: string
}

export function validate_session(data: any): Session {
    if (typeof data.id === 'string' && typeof data.storenumber === 'string' && typeof data.expires === 'string') {
        return data
    } else {
        throw console.error('Invalid type')
    }
}