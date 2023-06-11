// Sveltekit imports
import type { Actions, PageServerLoad } from './$types';

//Import Functions
import { scrapeProduct } from '$lib/scraper';
import { redirect } from '@sveltejs/kit';

// Import types and classes
import type { Session } from '$lib/types';
import { Product } from '$lib/classes/product';

export const load: PageServerLoad = async ({ url, cookies }) => {
	// Get if the user has pressed delete
	const del = url.searchParams.get('delete');
	// If not in delete mode redirect to edit
	if (del != 'true') {
		// Check if cookie is there
		if (cookies.get('product')) {
			throw redirect(303, '/sign/edit');
		}
	} else {
		// Delete cookie
		cookies.delete('product');
	}
};

export const actions: Actions = {
	/**
	 * Function for handling the scraping of an product
	 */
	default: async function ({ request, cookies, fetch }) {
		// Get user input from form
		const formdata = await request.formData();
		const artnr = String(formdata.get('artnr'));
		// Get session data
		const sessionData: Session = JSON.parse(String(cookies.get('session')));
		// If input data is a 5 long number
		if (artnr.length == 5) {
			// Scrape the data and parse return into product class
			const scrapeData = await scrapeProduct(artnr, sessionData.country);
			const product = Product.createFromObject(scrapeData);
			// Fix prices to match each country
			product.fixPrices(sessionData.country);
			// Set to cookie
			cookies.set('product', product.toJSONString());
			// Log the run
			fetch('/api/runs', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ store: sessionData.store, type: 'sign' })
			});
			// Redirect to edit page
			throw redirect(303, '/sign/edit');
		}
	}
};
