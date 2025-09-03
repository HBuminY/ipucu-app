import 'dotenv/config'
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import { app } from 'electron'
import path from 'path'

const dbPath =
  process.env.NODE_ENV === 'development'
    ? process.env.DATABASE_URL!
    : `file:${path.join(app.getPath('userData'), 'sqlite.db')}`
const client = createClient({
  url: dbPath
})

const db = drizzle(client)

export default db
