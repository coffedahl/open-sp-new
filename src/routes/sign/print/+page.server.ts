import type { PageServerLoad } from "./$types";
export const load: PageServerLoad = async ({ cookies, url }) => {
    //Get product data from cookies
    const product = JSON.parse(String(cookies.get('product')))
    //Get print  variable from searchparams
    const print: boolean = Boolean(url.searchParams.get('print')) || false
    //Send data to page
    return {
        product, print
    }

};