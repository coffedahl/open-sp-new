import type { PageServerLoad } from './$types';
import db from '$lib/database';
export const load: PageServerLoad = async () => {
	const response = await db.query('SELECT * FROM article;');
	return { article: response[0].result };
};
