import type { PageServerLoad } from "./$types";
export const load: PageServerLoad = async ({ cookies, url }) => {
    const product = JSON.parse(String(cookies.get('product')))
    const print: boolean = Boolean(url.searchParams.get('print')) || false
    cookies.delete('product')
    return {
        product, print
    }

};