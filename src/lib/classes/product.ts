export class Product {
	private _artnr?: string;
	private _title?: string;
	private _bullet: string[];
	private _current?: string;
	private _previous?: string;

	constructor(
		artnr: string,
		title: string,
		bulletlist: Array<string>,
		currentPrice: string,
		previousPrice: string
	) {
		this._artnr = artnr;
		this._title = title;
		this._bullet = bulletlist || [];
		this._current = currentPrice;
		this._previous = previousPrice;
	}

	/*
	 * WRITE GET AND SET  
	 */
}
