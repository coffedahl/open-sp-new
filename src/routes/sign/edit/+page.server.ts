import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import type { Product } from "puppeteer";
export const load: PageServerLoad = async ({ cookies }) => {
    const cookie = String(cookies.get('product'))
    if (cookie) {
        const product: Product = JSON.parse(cookie)
        return { product }
    } else {
        throw redirect(303, '/sign')
    }
};

export const actions: Actions = {
    update: async ({ request, cookies }) => {
        const formData = await request.formData()
        const title = formData.get('title')
        const current = formData.get('current')
        const bullet: string[] = [];
        bullet.push(String(formData.get('bullet1')))
        bullet.push(String(formData.get('bullet2')))
        bullet.push(String(formData.get('bullet3')))
        const previous = formData.get('previous')
        const artnr = formData.get('artnr')
        cookies.set('product', JSON.stringify({ title, current, bullet, previous, artnr }))
    },
    delete: async ({ cookies }) => {
        cookies.delete('product')
        throw redirect(303, '/sign?delete=true')
    },
    generate: async () => {
        throw redirect(301, '/sign/print?print=true')
    }
};