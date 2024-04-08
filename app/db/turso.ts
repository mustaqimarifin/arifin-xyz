import { createClient } from "@libsql/client";
import { tursoTKN, tursoURL } from "../utils/env";

export const turso = createClient({
  url: tursoURL,
  authToken: tursoTKN,
});
