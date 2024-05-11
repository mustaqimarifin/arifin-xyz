import { defineConfig } from "drizzle-kit";
import { env } from "site.config";

export default defineConfig({
  schema: "./src/db/pg-schema.ts",
  out: "./src/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: env.pgDirect!,
    //authToken: env.tursoTKN,
  },
});
