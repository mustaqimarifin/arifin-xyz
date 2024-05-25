import { type Config, defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/db/schema2.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://arifin:xyz@localhost:5432/psx',
  },
  verbose: true,
  strict: true,
}) as Config
