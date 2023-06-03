import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ locals }) => {
	const runList = locals.db.getRuns();
	return { runList };
};
