import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = async ({ locals }) => {
	const response = await locals.db.db.query('SELECT * FROM article;');
	return { article: response[0].result };
};
