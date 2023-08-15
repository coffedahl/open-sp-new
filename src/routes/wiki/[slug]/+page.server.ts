import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
    //get article data from database
    const response = await locals.db.db.query('SELECT * FROM $article;', { article: 'article:' + params.slug });
    //return article data to page
    return { article: response[0].result[0] }
};
