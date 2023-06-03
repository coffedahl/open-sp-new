export class Run {
	private _date: Date;
	private _id: string;
	private _store: string;
	private _type: 'sign' | 'type';

	constructor(id: string, store: string, date: Date, type: 'sign' | 'type') {
		this._date = date;
		this._id = id;
		this._store = store;
		this._type = type;
	}

	static createFromObject(object: any): Run {
		if (
			typeof object.id == 'string' &&
			typeof object.store == 'string' &&
			typeof object.date == 'string' &&
			(object.type === 'sign' || object.type === 'price')
		) {
			try {
				const date = new Date(object.date);
				return new Run(object.id, object.store, date, object.type);
			} catch (error) {
				throw new Error('Unable to parse datetime: ' + JSON.stringify(object));
			}
		} else {
			throw new Error('Unable to parse object to run: ' + JSON.stringify(object));
		}
	}
}
