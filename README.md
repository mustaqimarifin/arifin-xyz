[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmustaqimarifin%2Farifin.xyz)

# arifin.xyz

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [LibSQL](https://turso.tech/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org)
- **Deployment**: [Vercel](https://vercel.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)

## Running Locally

This application requires Node.js v18.17+.

```bash
git clone https://github.com/mustaqimarifin/arifin-xyz.git
cd arifin.xyz
bun install
bun run setup # Remove all of my personal information
bun dev
```

Create a `.env.local` file similar to [`.env.example`](https://github.com/mustaqimarifin/arifin.xyz/blob/main/.env.example).

## Database Schema

```sql

CREATE TABLE verification_token
(
  identifier TEXT NOT NULL,
  expires INTEGER NOT NULL,
  token TEXT NOT NULL,

  PRIMARY KEY (identifier, token)
);

CREATE TABLE accounts
(
  id TEXT,
  "userId" INTEGER NOT NULL,
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INTEGER,
  id_token TEXT,
  scope TEXT,
  session_state TEXT,
  token_type TEXT,

  PRIMARY KEY (id)
);

CREATE TABLE sessions
(
  id TEXT,
  "userId" INTEGER NOT NULL,
  expires INTEGER NOT NULL,
  "sessionToken" TEXT NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE users
(
  id TEXT,
  name TEXT,
  email TEXT,
  "emailVerified" TEXT,
  image TEXT,

  PRIMARY KEY (id)
);
CREATE TABLE guestbookA (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  body TEXT NOT NULL,
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT,
  avatar TEXT
);
CREATE TABLE guestbookB (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  "userId" TEXT,
  body TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT,

);

CREATE TABLE views (
  slug TEXT PRIMARY KEY,
  count INT NOT NULL
);



    CREATE VIEW guestbook
AS
SELECT
id, body, created_at,
	users.name AS name,
	users.image AS avatar
FROM
	guestbookB
INNER JOIN users ON users.id = guestbookB."userId"

```

## License

1. You are free to use this code as inspiration.
2. Please do not copy it directly.
3. Crediting the author is appreciated.

Please remove all of my personal information (blog posts, images, etc.) by running `bun run setup`.
