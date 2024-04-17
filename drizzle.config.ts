import type { Config } from "drizzle-kit";
import { env } from "./site.config";

export default {
	schema: "./db/schema.ts",
	out: "./db/migrations",
	driver: "turso",
	dbCredentials: {
		url: env.tursoURL,
		authToken: env.tursoTKN,
	},
} satisfies Config;
