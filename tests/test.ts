import { expect, test } from '@playwright/test';

test('Load default page', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Start' })).toBeVisible();
});
test.describe('test navigation', () => {
	test.describe('default button menu', () => {
		test('price adjustment', async ({ page }) => {
			await page.goto('/')
			await page.getByRole('link', { name: 'Price Adjustment' }).click()
			await expect(page.getByPlaceholder('Price adjustment string')).toBeVisible()
		})
	})
	test.describe('navigation menu', () => {
		test('test start button', async ({ page }) => {
			await page.goto('/price-adjustment')
			await page.getByRole('link', { name: 'Start' }).click()
			await expect(page.getByRole('heading', { name: 'Start' })).toBeVisible()
		})
	})
})