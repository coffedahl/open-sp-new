import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const storenumber = event.cookies.get('storenumber');
	if (!event.url.pathname.startsWith('/login')) {
		if (!storenumber) {
			throw redirect(303, '/login');
		}
	}
	const response = await resolve(event);
	return response;
};
