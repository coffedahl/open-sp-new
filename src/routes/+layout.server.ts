import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	try {
		const sessionData = JSON.parse(String(cookies.get('session')));
		return { storenumber: sessionData.store.split(':')[1].toUpperCase() };
	} catch {
		return { storenumber: 'undefined' };
	}
}) satisfies LayoutServerLoad;
