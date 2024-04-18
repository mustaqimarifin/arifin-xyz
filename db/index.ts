import * as schema from "@/db/schema";
import { env } from "@/site.config.mjs";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

export const turso = createClient({
	url: env.tursoURL!,
	authToken: env.tursoTKN,
});
export const db = drizzle(turso, { schema });
