import { redirect, type Handle } from '@sveltejs/kit';
import { Database } from '$lib/database';

const db = new Database('http://localhost:8000/rpc')
db.initDb('root', 'root', 'test', 'test')
console.log('db init')

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.db = db
	//OM INTE HAR SESSION
	if (!event.cookies.get('session') && !event.url.pathname.endsWith('/login')) {
		event.locals.storenumber = undefined
		throw redirect(303, '/login')
	} else if (event.cookies.get('session')) {
		//ANNARS HÄMTA SESSION
		const sessionData = JSON.parse(String(event.cookies.get('session')))
		try {
			// HÄMTA DB SESSION
			const dbSession = await db.getSessionById(sessionData.sessionId)
			event.locals.storenumber = dbSession.store
			// OM EXPIRED
			if (dbSession.expires < new Date()) {
				await db.deleteSessionById(dbSession.id)
				event.cookies.delete('session')
				event.locals.storenumber = undefined
				throw redirect(303, '/login')
			}
		} catch {
			//OM INTE FINNS I DB
			event.locals.storenumber = undefined
			event.cookies.delete('session')
			throw redirect(303, '/login')
		}
	}
	const response = await resolve(event);
	return response;
};
