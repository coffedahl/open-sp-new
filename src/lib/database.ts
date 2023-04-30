import Surreal from 'surrealdb.js'
const db = new Surreal('http://localhost:8000/rpc')

export async function initDb() {
    await db.signin({
        user: 'root',
        pass: 'root'
    })
    await db.use('test', 'test')
}
await initDb()
export default db
