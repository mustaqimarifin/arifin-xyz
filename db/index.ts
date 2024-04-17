import * as schema from "@/db/schema";
import { env } from "@/site.config";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

export const turso = createClient({
	//url: "file:local.db",
	url: env.tursoURL,
	authToken: env.tursoTKN,
});
export const db = drizzle(turso, { schema });
