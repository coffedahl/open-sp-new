import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
export const GET: RequestHandler = async ({ cookies, locals }) => {
    //Get session id from cookie
    const sessionData = JSON.parse(String(cookies.get('session')))
    //Delete the session from the database
    const response = await locals.db.deleteSessionById(sessionData.sessionId)
    // delete  session cookie
    cookies.delete('session')
    // redirect to login page
    throw redirect(303, '/login')
};