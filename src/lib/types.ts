export interface RunRequest {
    store: string,
    type: 'price' | 'sign'
}

export interface Session {
    id: string
    store: string
    expires: string,
    country: 'se' | 'no'
}

export function validate_session(data: any): Session {
    if (typeof data.id === 'string' && typeof data.store === 'string' && typeof data.expires === 'string') {
        return data
    } else {
        throw console.error('Invalid type')
    }
}