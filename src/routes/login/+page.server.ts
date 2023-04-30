import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	if (cookies.get('storenumber')) {
		throw redirect(303, '/');
	}
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formdata = await request.formData();
		const store = formdata.get('storenumber');
		if (store) {
			cookies.set('storenumber', String(store));
			throw redirect(303, '/');
		}
	}
};
