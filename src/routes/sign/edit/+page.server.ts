import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
export const load: PageServerLoad = async ({ cookies }) => {
    const product = JSON.parse(String(cookies.get('product')))
    return { ...product }
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
        throw redirect(303, '/')
    },
    generate: async () => {
        throw redirect(301, '/sign/print?print=true')
    }
};