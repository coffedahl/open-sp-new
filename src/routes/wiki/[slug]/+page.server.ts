import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
    const response = await locals.db.db.query('SELECT * FROM $article;', { article: 'article:' + params.slug });
    return { article: response[0].result[0] }
};
