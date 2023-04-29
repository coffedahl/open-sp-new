import type { PageServerLoad } from "./$types";
export const load: PageServerLoad = async ({ cookies }) => {
    const storenumber = String(cookies.get('storenumber'))
    return { storenumber }
};