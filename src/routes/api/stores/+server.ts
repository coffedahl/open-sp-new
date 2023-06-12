import type { RequestHandler } from "./$types";

export interface Store {
    storenumber: string
    password: string
    permissions?: string[]
    [key: string]: any
}

function validateStore(data: any): Store {
    if (typeof data.storenumber === 'string' && typeof data.password === 'string') {
        return data;
    } else {
        throw console.error('Invalid type')
    }
}

export const GET: RequestHandler = async ({ url, locals }) => {
    if (url.searchParams.has('storenumber')) {
        console.log("param met")
        const response = await locals.db.db.query('SELECT * FROM store WHERE storenumber = $storenumber;', { storenumber: url.searchParams.get('storenumber') })
        return new Response(JSON.stringify(response[0].result));
    } else {
        console.log("get all")
        const response = await locals.db.db.select('store')
        return new Response(JSON.stringify(response))
    }

};

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json()
    const store = validateStore(data)
    const response = await db.create('store', { storenumber: store.storenumber, password: store.password })
    return new Response(JSON.stringify(response));
};

export const DELETE: RequestHandler = async () => {
    const response = await db.delete('store')
    return new Response(JSON.stringify({ message: "deleted store", db_response: response }))
}