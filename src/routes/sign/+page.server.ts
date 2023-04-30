import type { Actions, PageServerLoad } from "./$types";
import { scrapeProduct } from "$lib/scraper";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies }) => {
    if (cookies.get('product')) {
        throw redirect(303, '/sign')
    }
};

export const actions: Actions = {
    default: async function ({ request, cookies }) {
        const formdata = await request.formData()
        const artnr = String(formdata.get('artnr'))
        if (artnr.length == 5) {
            const product = await scrapeProduct(artnr)
            cookies.set('product', JSON.stringify(product))
            throw redirect(303, '/sign')
        }
    }
};