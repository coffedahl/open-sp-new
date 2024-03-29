// Imports
import puppeteer from 'puppeteer';
// Type for the collected data
interface ScrapeData {
	artnr?: string;
	bullet: string[];
	title?: string;
	current?: string;
	previous?: string;
}

// Selectors for data on website
const titleSelector = '#content-container > div > div > h1';
const bulletSelector = '#content-container > div > div > ul > li';
const currentPriceSelector = '#content-container > div > div > div > div > div > span > span';
const previousPriceSelector =
	'#content-container > div > div > div > div > div > span > div > span';

export async function scrapeProduct(artnr: string, country: 'se' | 'no') {
	const object: ScrapeData = { bullet: [] };
	// Setup browser
	object['artnr'] = artnr;
	const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
	const page = await browser.newPage();
	// Goto kjell
	await page.goto('https://www.kjell.com/' + country + '/' + artnr);
	// Get title
	const title = await page.$eval(titleSelector, (el) => el.innerText);
	object['title'] = title;
	// Get bulletpoints
	const listItems = await page.$$(bulletSelector);
	listItems.forEach(async (list) => {
		const text: string = await page.evaluate((el) => el.innerText, list);
		object['bullet'].push(text);
	});
	// Get prices
	const currentPrice = await page.$eval(currentPriceSelector, (el) => el.innerText);
	object['current'] = currentPrice;
	try {
		const previousPrice = await page.$eval(previousPriceSelector, (el) => el.innerText);
		object['previous'] = previousPrice;
	} catch {
		object['previous'] = '';
	}
	// Close the scraper and return object
	await browser.close();
	return object;
}
