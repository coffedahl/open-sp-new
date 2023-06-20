import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { Store } from '$lib/classes/store';

export const load: PageServerLoad = async ({ cookies }) => {
	if (cookies.get('session')) {
		throw redirect(303, '/');
	}
};

export const actions: Actions = {
	login: async ({ request, locals, cookies }) => {
		const formdata = await request.formData();
		const storenumber = formdata.get('storenumber');
		const password = formdata.get('password');
		try {
			const store = await locals.db.getStoreByStorenumber(String(storenumber));
			if (store.password == password) {
				const sessionData = await locals.db.createSession(store);
				console.log(sessionData.id);
				cookies.set('session', JSON.stringify({ sessionId: sessionData.id }));
				throw redirect(303, '/');
			} else {
				return fail(400, { storenumber, wrongPass: true });
			}
		} catch (error) {
			return fail(400, { wrongStore: true });
		}
	}
};
