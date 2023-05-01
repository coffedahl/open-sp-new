import type { RequestHandler } from "./$types";
import db from "$lib/database";
export const DELETE: RequestHandler = async () => {
    await db.delete('session')
    return new Response(JSON.stringify({ message: 'all sessions has been deleted' }));
};