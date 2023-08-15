import { redirect, type Handle } from '@sveltejs/kit';
import { Database } from '$lib/database';

// Create and init database object from environment variable
const db = Database.createFromEnvUrl()
db.initDb('root', 'root', 'test', 'test')
console.log('db init')

// handle hook
export const handle: Handle = async ({ event, resolve }) => {
	event.locals.db = db
	// If no session is present
	if (!event.cookies.get('session') && !event.url.pathname.endsWith('/login')) {
		// Set local server variable to undefined and redirect to login
		event.locals.storenumber = undefined
		throw redirect(303, '/login')
	} else if (event.cookies.get('session')) {
		// If session is present in cookies get the data and parse as json object
		const sessionData = JSON.parse(String(event.cookies.get('session')))
		try {
			// Get the session from the database
			const dbSession = await db.getSessionById(sessionData.sessionId)
			// If the session has an exipired date
			if (dbSession.expires < new Date()) {
				await db.deleteSessionById(dbSession.id)
				event.cookies.delete('session')
				event.locals.storenumber = undefined
				throw redirect(303, '/login')
			} else {
				// Set local server value the store number
				event.locals.storenumber = dbSession.store
			}
		} catch {
			//If no session exist in database
			// Delete variables and cookies and redicrect to login
			event.locals.storenumber = undefined
			event.cookies.delete('session')
			throw redirect(303, '/login')
		}
	}
	// Resolve the hook and return response
	const response = await resolve(event);
	return response;
};
