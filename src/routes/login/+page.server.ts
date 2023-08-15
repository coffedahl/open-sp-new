import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { Store } from '$lib/classes/store';

export const load: PageServerLoad = async ({ cookies }) => {
	//Check if cookie exsist and redirect to main menu if it does
	if (cookies.get('session')) {
		throw redirect(303, '/');
	}
};

export const actions: Actions = {
	//Login button pressed
	login: async ({ request, locals, cookies }) => {
		//Get data from form
		const formdata = await request.formData()
		const storenumber = formdata.get('storenumber')
		const password = formdata.get('password')
		//Get store from the databse
		const store = await locals.db.getStoreByStorenumber(String(storenumber))
		// Check if password enterd matches the password in database
		if (store.password == password) {
			//Create a new session on the databse
			const sessionData = await locals.db.createSession(store)
			//log the session id and set the session cookie
			console.log(sessionData.id)
			cookies.set('session', JSON.stringify({ sessionId: sessionData.id }))
			//redirect to main menu
			throw redirect(303, '/')
		}
		else {
			// return false if login failed
			return false
		}
	}
};
