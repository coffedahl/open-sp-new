import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ locals }) => {
	//get article data from database
	const response = await locals.db.db.query('SELECT * FROM article;');
	//send data to page
	return { article: response[0].result };
};
