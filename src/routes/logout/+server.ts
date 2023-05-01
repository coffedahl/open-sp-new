import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import db from "$lib/database";
export const GET: RequestHandler = async ({ cookies }) => {
    const sessionData = JSON.parse(String(cookies.get('session')))
    const response = await db.delete(sessionData.id)
    cookies.delete('session')
    throw redirect(303, '/login')
};