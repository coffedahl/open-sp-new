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
		// Create a string variable
		let url: string;
		// if in dev mode
		if (import.meta.env.DEV) {
			// URL from .env file
			url = DATABASE_URL;
			console.log('dev:' + url);
		} else {
			// Import environment variable from command
			url = String(process.env.DATABASE_URL || 'http://localhost:8000/rpc');
			console.log('prod:' + url);
		}
		// Create new database object from the url
		return new Database(url);
	}

	/**
	 * Function for initializeing the db
	 * @param user username for the database
	 * @param pass password for the database
	 * @param ns namspace name
	 * @param db database name
	 */
	initDb(user: string, pass: string, ns: string, db: string) {
		this._db.signin({ user, pass });
		this._db.use(ns, db);
	}

	/**
	 * SESSION 
	 */
	/**
	 * Function for getting a session from database
	 * @param sessionId The id of the session
	 * @returns Promise of a session 
	 */
	async getSessionById(sessionId: string): Promise<Session> {
		const response = await this._db.query('SELECT * FROM session WHERE id = $sessionId;', { sessionId })
		// If you get a result
		if (response[0].result[0]) {
			return Session.createFromObject(response[0].result[0])
		} else {
			throw Error('No session found with id: ' + sessionId)
		}
	}

	/** TODO!!! NEEDS HASH */
	/**
	 * Function for createing a new session
	 * @param store The store that the session is being created for
	 * @returns Promise of a store session
	 */
	async createSession(store: Store): Promise<Session> {
		// Create a session in the database
		const response = await this._db.query('CREATE session SET store = $store, expires = time::now() + 1h, country = $country;', { store: store.storeNumber, country: store.country })
		// If a session has been created return session object
		if (response[0].result[0]) {
			const sessionData = response[0].result[0]
			return Session.createFromObject(sessionData)
		} else {
			throw new Error('Unable to create session')
		}
	}

	/**
	 * Function for deleteing a session from the database
	 * @param sessionId The id of the session that is beeing deleted
	 */
	async deleteSessionById(sessionId: string) {
		const response = this._db.delete(sessionId);
		console.log(response)
	}

	/**
	 * USER
	 */

	/**
	 * Function for getting a store from the database
	 * @param storenumber The storenumber of the store
	 * @returns Promise of an store object
	 */
	async getStoreByStorenumber(storenumber: string): Promise<Store> {
		// Get store from database
		const response = await this._db.query('SELECT * FROM store WHERE id = $storenumber;', { storenumber: "store:" + storenumber })
		// if you get result return new store object
		if (response[0].result[0]) {
			return Store.createFromObject(response[0].result[0])
		} else {
			throw new Error('No user with username: ' + storenumber + ' was found')
		}
	}

	get db() {
		return this._db
	}
}
