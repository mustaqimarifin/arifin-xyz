import type { Config } from "drizzle-kit";
import { env } from "./site.config";
//import { localTURSO } from "./db";

export default {
	schema: "./db/schema.ts",
	out: "./db/migrations",
	driver: "turso",
	dbCredentials: {
		url: env.tursoURL,
		authToken: env.tursoTKN,
	},
} satisfies Config;
