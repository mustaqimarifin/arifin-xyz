import { createClient } from "@libsql/client";
// import { createClient } from "@libsql/client/web";

export const turso = createClient({
  url: process.env.TURSO_URL!,
  authToken: process.env.TURSO_TOKEN,
});
