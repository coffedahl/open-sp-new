import type { RequestHandler } from "./$types";
export const DELETE: RequestHandler = async ({ locals }) => {
    await locals.db.db.delete('session')
    return new Response(JSON.stringify({ message: 'all sessions has been deleted' }));
};