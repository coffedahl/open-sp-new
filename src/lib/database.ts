import { DATABASE_URL } from '$env/static/private'
import Surreal from 'surrealdb.js'

let url: string;

if (import.meta.env.DEV) {
    url = DATABASE_URL
    console.log('dev:' + url)
} else {
    url = String(process.env.DATABASE_URL || 'http://localhost:8000/rpc')
    console.log('prod:' + url)
}

const db = new Surreal(url)

export async function initDb() {
    await db.signin({
        user: 'root',
        pass: 'root'
    })
    await db.use('test', 'test')
}
await initDb()

export default db
