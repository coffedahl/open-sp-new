import { redirect } from '@sveltejs/kit';
import db from '$lib/database';
import type { Actions, PageServerLoad } from './$types';
import type { Store } from '../api/stores/+server';

export const load: PageServerLoad = async ({ cookies }) => {
	if (cookies.get('session')) {
		throw redirect(303, '/');
	}
};

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const formdata = await request.formData()
		const storenumber = formdata.get('storenumber')
		const password = formdata.get('password')
		const response = await db.query('SELECT * FROM store WHERE storenumber = $store;', { store: storenumber })
		if (response[0].result[0]) {
			const store: Store = response[0].result[0]
			if (store.password == password) {
				const sessionRes = await db.query('CREATE session SET storenumber = $storenumber, country=$country, expires = time::now() + 1h;', { storenumber: store.storenumber, country: store.country })
				const sessionData = sessionRes[0].result[0]
				cookies.set('session', JSON.stringify(sessionData))
				throw redirect(303, '/')
			}
		} else {
			return false
		}

	}
};
