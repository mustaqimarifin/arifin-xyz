//import { DefaultLogger, type LogWriter } from 'drizzle-orm/logger'

import { env } from 'site.config'
import postgres from 'postgres'
//import { appendFile } from 'fs'
import { Pool } from 'pg'
export const sql = postgres(env.pgPool)

export type SQL = typeof sql

export const db = new Pool({
  connectionString: env.pgPool,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

//const connectionString = 'postgresql://arifin:xyz@localhost:5432/pgx'
//export const sql = postgres(connectionString, { max: 4 })

//const sqldz = postgres(connectionString, { max: 4 })

//const sqldz = drizzle(db,)

/* const file = 'npde_pg_queries.sql'
class MyLogWriter implements LogWriter {
  write(message: string) {
    appendFile(file, message, 'utf8', (err) => {
      if (err) throw err
      //console.log(`() )====D)!`);
    })
  }
} */
//const logger = new DefaultLogger({ writer: new MyLogWriter() })
//export const sx = drizzle(db, { logger })
