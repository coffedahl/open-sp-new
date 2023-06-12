import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	try {
		return { storenumber: locals.storenumber.toUpperCase() };
	} catch {
		return { storenumber: 'undefined' };
	}
}) satisfies LayoutServerLoad;
