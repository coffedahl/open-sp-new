import Surreal from 'surrealdb.js';
import { DATABASE_URL } from '$env/static/private';
import { Session } from './classes/session';
import { Store } from './classes/store';

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

	/**
	 * SESSION 
	 */
	async getSessionById(sessionId: string): Promise<Session> {
		const response = await this._db.query('SELECT * FROM session WHERE id = $sessionId;', { sessionId })
		if (response[0].result[0]) {
			return Session.createFromObject(response[0].result[0])
		} else {
			throw Error('No session found with id: ' + sessionId)
		}
	}

	/** NEEDS HASH */
	async createSession(store: Store): Promise<Session> {
		const response = await this._db.query('CREATE session SET store = $store, expires = time::now() + 1h;', { store: store.storeNumber })
		if (response[0].result[0]) {
			const sessionData = response[0].result[0]
			return Session.createFromObject(sessionData)
		} else {
			throw new Error('Unable to create session')
		}
	}

	async deleteSessionById(sessionId: string) {
		const response = this._db.delete(sessionId);
		console.log(response)
	}

	/**
	 * USER
	 */
	async getStoreByStorenumber(storenumber: string): Promise<Store> {
		console.log('store:' + storenumber)
		const response = await this._db.query('SELECT * FROM store WHERE id = $storenumber;', { storenumber: "store:" + storenumber })
		console.log(JSON.stringify(response))
		if (response[0].result[0]) {
			return Store.createFromObject(response[0].result[0])
		} else {
			throw new Error('No user with username: ' + storenumber + ' was found')
		}
	}
}
