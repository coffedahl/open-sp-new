import { redirect, type Handle } from '@sveltejs/kit';
import db from '$lib/database';
import { validate_session, type Session } from '$lib/types';

export const handle: Handle = async ({ event, resolve }) => {
	//OM INTE HAR SESSION
	if (!event.cookies.get('session') && !event.url.pathname.endsWith('/login')) {
		throw redirect(303, '/login')
	} else if (event.cookies.get('session')){
		//ANNARS HÄMTA SESSION
		const sessionData = JSON.parse(String(event.cookies.get('session')))
		try {
			// HÄMTA DB SESSION
			const response = await db.select(sessionData.id)
			const dbSession: Session = validate_session(response)
			const expires = new Date(dbSession.expires)
			// OM EXPIRED
			if (expires < new Date()) {
				await db.delete(sessionData.id)
				event.cookies.delete('session')
				throw redirect(303, '/login')
			}
		} catch {
			//OM INTE FINNS I DB
			event.cookies.delete('session')
			throw redirect(303, '/login')
		}
	}
	const response = await resolve(event);
	return response;
};
