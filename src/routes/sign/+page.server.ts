import type { Actions, PageServerLoad } from "./$types";
import { scrapeProduct } from "$lib/scraper";
import { redirect } from "@sveltejs/kit";
import type { Session } from "$lib/types";

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
    default: async function ({ request, cookies, fetch }) {
        const formdata = await request.formData()
        const sessionData: Session = JSON.parse(String(cookies.get('session')))
        const artnr = String(formdata.get('artnr'))
        if (artnr.length == 5) {
            const product = await scrapeProduct(artnr, sessionData.country)
            cookies.set('product', JSON.stringify(product))
            fetch('/api/runs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ store: sessionData.store, type: 'sign' })
            })
            throw redirect(303, '/sign/edit')
        }
    }
};