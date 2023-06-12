import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
export const GET: RequestHandler = async ({ cookies, locals }) => {
    const sessionData = JSON.parse(String(cookies.get('session')))
    const response = await locals.db.deleteSessionById(sessionData.sessionId)
    cookies.delete('session')
    throw redirect(303, '/login')
};