import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { Product } from '$lib/classes/product';

export const load: PageServerLoad = async ({ cookies }) => {
	//get product data from cookies
	const cookie = String(cookies.get('product'));
	// if there is data
	if (cookie) {
		//Create a new product object
		const product = Product.createFromObject(JSON.parse(cookie));
		//pass trough data as object
		return { product: product.toObject() };
	} else {
		//redirect to initial sign page
		throw redirect(303, '/sign');
	}
};

export const actions: Actions = {
	// Update button
	update: async ({ request, cookies }) => {
		// get formdata
		const formData = await request.formData();
		const title = formData.get('title');
		const current = formData.get('current');
		const bullet: string[] = [];
		bullet.push(String(formData.get('bullet1')));
		bullet.push(String(formData.get('bullet2')));
		bullet.push(String(formData.get('bullet3')));
		const previous = formData.get('previous');
		const artnr = formData.get('artnr');
		//update the product cookie
		cookies.set('product', JSON.stringify({ title, current, bullet, previous, artnr }));
	},
	//Delete button	
	delete: async ({ cookies }) => {
		//delete cookie and redirect to initial sign page
		cookies.delete('product');
		throw redirect(303, '/sign?delete=true');
	},
	//generate button
	generate: async () => {
		//redirect to print page
		throw redirect(301, '/sign/print?print=true');
	}
};
