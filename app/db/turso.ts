//import { createClient } from "@libsql/client";
import { tursoTKN, tursoURL } from "../utils/env";
import { createClient } from "@libsql/client/web";

export const turso = createClient({
  url: tursoURL,
  authToken: tursoTKN,
});
