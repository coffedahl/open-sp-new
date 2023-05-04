import type { LayoutServerLoad } from './$types';
import db from '$lib/database';
export const load: LayoutServerLoad = async ({}) => {
	const response = await db.query('SELECT * FROM article;');
	return { article: response[0].result };
};
