import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ locals }) => {
	const response = await locals.db.db.query('SELECT * FROM article;');
	return { article: response[0].result };
};
