// See https://kit.svelte.dev/docs/types#app

import type { Database } from "$lib/database";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: Database
			storenumber?: string
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };
