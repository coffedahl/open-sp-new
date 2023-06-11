export class Session {
	private _id: string;
	private _store: string;
	private _expires: Date;
	private _country: 'se' | 'no';

	constructor(id: string, store: string, expires: Date, country: 'se' | 'no') {
		this._id = id;
		this._store = store;
		this._expires = expires;
		this._country = country;
	}

	static createFromObject(object: any) {
		if (
			typeof object.id === 'string' &&
			typeof object.store === 'string' &&
			typeof object.expires === 'string'
		) {
			try {
				const date = new Date(object.expires);
				return new Session(object.id, object.store, date, 'no');
			} catch {
				throw Error('The variable "expires" is not datetime: ' + object.expires);
			}
		} else {
			throw Error('Invalid input types');
		}
	}

    /**
     * CREATE GET AND SET FUNCTIONS
     */
}
