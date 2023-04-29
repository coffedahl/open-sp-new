import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
    return { storenumber: String(cookies.get('storenumber')) };
}) satisfies LayoutServerLoad;