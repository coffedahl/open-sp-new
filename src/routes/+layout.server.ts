import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	// Try to get storenumber from local server variables otherwise set to undefined
	try {
		return { storenumber: locals.storenumber.toUpperCase() };
	} catch {
		return { storenumber: 'undefined' };
	}
}) satisfies LayoutServerLoad;
