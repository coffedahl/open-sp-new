export class Session {
	/**
	 * VARIABLES
	 */
	private _id: string; // id for an session
	private _store: string; // the stornumber of the store the session belongs to
	private _expires: Date; // The datetime when the session expires
	private _country: 'se' | 'no' // country of the store 


	/**
	 * Simple constructor
	 */
	constructor(id: string, store: string, expires: Date, country: 'se' | 'no') {
		this._id = id;
		this._store = store;
		this._expires = expires;
		this._country = country
	}

	/**
	 * Create an session from an existing object
	 * @param object the object conaining id, store,expires and country data
	 * @returns new session object
	 */
	static createFromObject(object: any) {
		// Check if input object contains the correct data
		if (
			typeof object.id === 'string' &&
			typeof object.store === 'string' &&
			typeof object.expires === 'string' &&
			(object.country == 'no' || object.country == 'se')
		) {
			// Try to parse data into datetime object and return new session
			try {
				const date = new Date(object.expires);
				return new Session(object.id, object.store, date, object.country);
			} catch {
				//Throw error if date is not correct format
				throw Error('The variable "expires" is not datetime: ' + object.expires);
			}
		} else {
			//Throw error if inputdata is not correct
			throw Error('Invalid input types');
		}
	}

	// Getter and setter for the id varaiable
	get id(): string {
		return this._id;
	}

	set id(value: string) {
		this._id = value;
	}

	//Getter and setter for store variable
	get store(): string {
		return this._store;
	}

	set store(value: string) {
		this._store = value;
	}

	//Getter and setter for date varaible
	get expires(): Date {
		return this._expires;
	}

	set expires(value: Date) {
		this._expires = value;
	}

	// Getter for country variable
	get country(): 'se' | 'no' {
		return this._country
	}
}
