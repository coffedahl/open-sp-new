export class Session {
	private _id: string;
	private _store: string;
	private _expires: Date;
	private _country: 'se' | 'no'

	constructor(id: string, store: string, expires: Date, country: 'se' | 'no') {
		this._id = id;
		this._store = store;
		this._expires = expires;
		this._country = country
	}

	static createFromObject(object: any) {
		if (
			typeof object.id === 'string' &&
			typeof object.store === 'string' &&
			typeof object.expires === 'string' &&
			(object.country == 'no' || object.country == 'se')
		) {
			try {
				const date = new Date(object.expires);
				return new Session(object.id, object.store, date, object.country);
			} catch {
				throw Error('The variable "expires" is not datetime: ' + object.expires);
			}
		} else {
			throw Error('Invalid input types');
		}
	}

	get id(): string {
		return this._id;
	}

	set id(value: string) {
		this._id = value;
	}

	get store(): string {
		return this._store;
	}

	set store(value: string) {
		this._store = value;
	}

	get expires(): Date {
		return this._expires;
	}

	set expires(value: Date) {
		this._expires = value;
	}

	get country(): 'se' | 'no' {
		return this._country
	}
}
