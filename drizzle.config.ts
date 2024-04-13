import type { Config } from "drizzle-kit";
import { tursoTKN, tursoURL } from "./utils/env";
//import { localTURSO } from "./db";

export default {
	schema: "./db/schema.ts",
	out: "./db/migrations",
	driver: "turso",
	dbCredentials: {
		//url: localTURSO ,
		url: tursoURL,
		authToken: tursoTKN,
	},
} satisfies Config;
