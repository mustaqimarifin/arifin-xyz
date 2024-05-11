import * as schema from "@/db/pg-schema";
//import * as sqliteSchema from '@/db/schema'
//import {neon} from '@neondatabase/serverless'

//import {createClient} from '@libsql/client'
//import {drizzle} from 'drizzle-orm/neon-http'
//const sql = neon(env.pgPool)

//export const db = drizzle(turso, {sqliteSchema})
//import {drizzle} from 'drizzle-orm/libsql'
/* export const turso = createClient({
  url: env.tursoURL!,
  authToken: env.tursoTKN,
}) */

//! Local Postgres
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "site.config";

const pool = new Pool({
  connectionString: env.pgPool,
});

export const db = drizzle(pool, { schema });
