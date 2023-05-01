import type { Session } from "$lib/types";
import type { PageServerLoad } from "./$types";
export const load: PageServerLoad = async ({ cookies }) => {
    const sessionData: Session = JSON.parse(String(cookies.get('session')))
    return { storenumber: sessionData.id }
};