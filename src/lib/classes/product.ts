/**
 * Class for products
 */
export class Product {
	/**
	* Product variables
	*/
	private _artnr?: string; //Article number of the product
	private _title?: string; //The name of the product
	private _bullet: string[]; //A list of bulletpoints with infomation
	private _current?: string; //the current price of the product
	private _previous?: string; //The previous price of the product

	/**
	 * Simple constructor for the product
	 */
	constructor(artnr: string, title: string, bullet: string[], current: string, previous: string) {
		this._artnr = artnr;
		this._title = title;
		this._previous = previous;
		this._bullet = bullet || [];
		this._current = current;
	}

	/**
	 * Creates an new product class object from an object that has the correct data
	 * @param object Object conaining artnr,title,current & previous data for a product
	 * @returns an new product object with the data 
	 */
	static createFromObject(object: any): Product {
		// Check that object contains correct data
		if (
			typeof object.artnr === 'string' &&
			typeof object.title === 'string' &&
			typeof object.current === 'string' &&
			typeof object.previous === 'string'
		) {
			//Return new product object
			return new Product(
				object.artnr,
				object.title,
				object.bullet,
				object.current,
				object.previous
			);
		} else {
			// Throw error that the inputobject dont contains correct data
			throw new Error('Object not parsable as Product: ' + JSON.stringify(object));
		}
	}

	/**
	 * Function that converts a product object into a json string of data
	 * @returns product information in json string
	 */
	toJSONString(): string {
		//create new object with product data
		const object = {
			artnr: this._artnr,
			title: this._title,
			current: this._current,
			previous: this._previous,
			bullet: this._bullet
		};
		//Convert to json and return
		return JSON.stringify(object);
	}

	/**
	 * Creates an object with the data from a product
	 * @returns product data in the format of an object
	 */
	toObject() {
		//create new object containing object data
		const object = {
			artnr: this._artnr,
			title: this._title,
			current: this._current,
			previous: this._previous,
			bullet: this._bullet
		};
		// return the new object
		return object
	}

	/**
	 * function for fixin the price string to the correct format depending on country
	 * @param country string of 'se' or 'no' depending of witch price format is needed
	 */
	fixPrices(country: 'se' | 'no') {
		//Check that prices dont already has correct format
		if (!this._current?.includes(',') && !this._current?.includes(':')) {
			//Create a string and depending on witch country set the character
			let character: string;
			if (country == 'se') {
				character = ':';
			} else {
				character = ',';
			}
			//Insert the character 2places from the back in the pricestring
			this._current = [
				this._current?.substring(0, this._current.length - 2),
				character,
				this._current?.substring(this._current.length - 2)
			].join('');
			//Log the new string
			console.log(this._current);
		}
	}

	// Getter and Setter for '_artnr'
	get artnr(): string | undefined {
		return this._artnr;
	}
	set artnr(value: string | undefined) {
		this._artnr = value;
	}

	// Getter and Setter for '_title'
	get title(): string | undefined {
		return this._title;
	}
	set title(value: string | undefined) {
		this._title = value;
	}

	// Getter and Setter for '_bullet'
	get bullet(): string[] {
		return this._bullet;
	}
	set bullet(value: string[]) {
		this._bullet = value;
	}

	// Getter and Setter for '_current'
	get current(): string | undefined {
		return this._current;
	}
	set current(value: string | undefined) {
		this._current = value;
	}

	// Getter and Setter for '_previous'
	get previous(): string | undefined {
		return this._previous;
	}
	set previous(value: string | undefined) {
		this._previous = value;
	}
}
