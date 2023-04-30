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