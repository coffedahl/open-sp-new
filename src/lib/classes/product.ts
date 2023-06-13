export class Product {
	private _artnr?: string;
	private _title?: string;
	private _bullet: string[];
	private _current?: string;
	private _previous?: string;

	constructor(artnr: string, title: string, bullet: string[], current: string, previous: string) {
		this._artnr = artnr;
		this._title = title;
		this._previous = previous;
		this._bullet = bullet || [];
		this._current = current;
	}

	static createFromObject(object: any): Product {
		if (
			typeof object.artnr === 'string' &&
			typeof object.title === 'string' &&
			typeof object.current === 'string' &&
			typeof object.previous === 'string'
		) {
			return new Product(
				object.artnr,
				object.title,
				object.bullet,
				object.current,
				object.previous
			);
		} else {
			throw new Error('Object not parsable as Product: ' + JSON.stringify(object));
		}
	}

	toJSONString(): string {
		const object = {
			artnr: this._artnr,
			title: this._title,
			current: this._current,
			previous: this._previous,
			bullet: this._bullet
		};
		return JSON.stringify(object);
	}

	toObject() {
		const object = {
			artnr: this._artnr,
			title: this._title,
			current: this._current,
			previous: this._previous,
			bullet: this._bullet
		};
		return object
	}

	fixPrices(country: 'se' | 'no') {
		if (!this._current?.includes(',') && !this._current?.includes(':')) {
			let character: string;
			if (country == 'se') {
				character = ':';
			} else {
				character = ',';
			}
			this._current = [
				this._current?.substring(0, this._current.length - 2),
				character,
				this._current?.substring(this._current.length - 2)
			].join('');
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
