import type { RunRequest } from "$lib/types";
import type { RequestHandler } from "./$types";


export const POST: RequestHandler = async ({ request, locals }) => {
    const data: RunRequest = await request.json()
    const res = locals.db.db.create('run', { store: data.store, type: data.type, date: new Date() })
    return new Response(JSON.stringify({ res }));
};

export const GET: RequestHandler = async () => {
    const data = await db.select('run')
    return new Response(JSON.stringify({ data: data }))
}

export const DELETE: RequestHandler = async () => {
    await db.delete('run')
    return new Response(JSON.stringify({ message: 'run has been deleted' }))
}