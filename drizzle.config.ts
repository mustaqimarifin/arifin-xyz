import type { Config } from "drizzle-kit";
import { tursoURL, tursoTKN } from "./app/utils/env";
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
