import Surreal from 'surrealdb.js';
import { DATABASE_URL } from '$env/static/private';

export class Database {
	private _db;

	constructor(url: string) {
		this._db = new Surreal(url);
	}

	/**
	 * Function for creating a database instance from envrionment variables
	 */
	static createFromEnvUrl() {
		let url: string;
		if (import.meta.env.DEV) {
			url = DATABASE_URL;
			console.log('dev:' + url);
		} else {
			url = String(process.env.DATABASE_URL || 'http://localhost:8000/rpc');
			console.log('prod:' + url);
		}
		return new Database(url);
	}

	initDb(user: string, pass: string, ns: string, db: string) {
		this._db.signin({ user, pass });
		this._db.use(ns, db);
	}
}
