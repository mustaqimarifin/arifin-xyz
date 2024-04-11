import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "@/db/schema";
import { tursoTKN, tursoURL } from "@/app/utils/env";

export const localTURSO = "http://127.0.0.1:8080"

export const turso = createClient({
  //url: "file:local.db",
  url: tursoURL,
  authToken: tursoTKN,
});
export const db = drizzle(turso, { schema });
