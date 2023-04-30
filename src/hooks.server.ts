import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    const storenumber = event.cookies.get('storenumber')
    if (!storenumber && !event.url.pathname.startsWith('/login')) {
        throw redirect(303, '/login')
    } else {
        const response = await resolve(event)
        return response
    }
}