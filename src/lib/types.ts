export interface RunRequest {
    store: string,
    type: 'price' | 'sign'
}

/***
 * This is being deleted when session class is implemented
 */
export interface Session {
    id: string
    store: string
    expires: string
    country: 'se' | 'no'
}
/***
 * This is being deleted when session class is implemented
 */
export function validate_session(data: any): Session {
    if (typeof data.id === 'string' && typeof data.store === 'string' && typeof data.expires === 'string') {
        return data
    } else {
        throw console.error('Invalid type')
    }
}