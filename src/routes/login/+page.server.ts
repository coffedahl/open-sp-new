import { fail, redirect } from '@sveltejs/kit';
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
		//Get form data
		const formdata = await request.formData();
		const storenumber = formdata.get('storenumber');
		const password = formdata.get('password');
		//try for getting from database
		try {
			//fetch store data from database
			const store = await locals.db.getStoreByStorenumber(String(storenumber));
			//if password matches the database
			if (store.password == password) {
				//create a new session
				const sessionData = await locals.db.createSession(store);
				//log the session id
				console.log(sessionData.id);
				//create a new session cookie and redirect to main menu
				cookies.set('session', JSON.stringify({ sessionId: sessionData.id }));
				throw redirect(303, '/');
			} else {
				//if password dont match return fail with wron pass
				return fail(400, { storenumber, wrongPass: true });
			}
		} catch (error) {
			//if database fetch throws error return fail with wrong store
			return fail(400, { wrongStore: true });
		}
	}
};
