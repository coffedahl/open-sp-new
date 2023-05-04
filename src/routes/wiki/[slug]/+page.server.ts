import db from '$lib/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const response = await db.query('SELECT * FROM $article;', { article: 'article:' + params.slug });
    return {article: response[0].result[0]}
};
