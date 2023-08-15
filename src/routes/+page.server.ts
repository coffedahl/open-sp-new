import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
    //Check if session cookie exist or redirect to login
    if (!cookies.get('session')) {
        throw redirect(303, '/login')
    }
};