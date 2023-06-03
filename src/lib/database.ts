import Surreal from 'surrealdb.js';
import { DATABASE_URL } from '$env/static/private';
import { Run } from './classes/run';

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

	async getRuns(): Promise<Array<Run>> {
		const response = await this._db.query('SELECT * FROM run;');
		if (response[0].result.length != 0) {
			const runList: Array<Run> = [];
			response[0].result.forEach((element: any) => {
				runList.push(Run.createFromObject(element));
			});
			return runList;
		} else {
			throw new Error('No runs was found');
		}
	}

	async getRunsSortStore(store?: string): Promise<Array<Run>> {
		if (store) {
			this._db.query(
				'SELECT count(), store, type FROM run WHERE store = $store GROUP BY store, type;',
				{ store: 'store:no016' }
			);
		} else {
			this._db.query('SELECT count(), store, type FROM run GROUP BY store, type');
		}
	}
}
