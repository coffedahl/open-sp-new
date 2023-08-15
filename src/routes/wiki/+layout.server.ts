import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = async ({ locals }) => {
	//get articles from the database
	const response = await locals.db.db.query('SELECT * FROM article;');
	//send data to layout
	return { article: response[0].result };
};
