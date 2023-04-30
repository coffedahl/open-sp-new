import type { Actions, PageServerLoad } from "./$types";
import { scrapeProduct } from "$lib/scraper";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ url, cookies }) => {
    const del = url.searchParams.get('delete')
    if (del != 'true') {
        if (cookies.get('product')) {
            throw redirect(303, '/sign/edit')
        }
    } else {
        cookies.delete('product')
    }
};

export const actions: Actions = {
    default: async function ({ request, cookies }) {
        const formdata = await request.formData()
        const artnr = String(formdata.get('artnr'))
        if (artnr.length == 5) {
            const product = await scrapeProduct(artnr)
            cookies.set('product', JSON.stringify(product))
            throw redirect(303, '/sign/edit')
        }
    }
};