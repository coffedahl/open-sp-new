import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const formdata = await request.formData()
        const store = formdata.get('storenumber')
        if (store) {
            cookies.set('storenumber', String(store))
            redirect(303,'/')
        }
    }
};