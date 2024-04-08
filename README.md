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
CREATE TABLE guestbook (
  id TEXT PRIMARY KEY UNIQUE,
  email TEXT NOT NULL UNIQUE,
  body TEXT NOT NULL,
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT,
  avatar TEXT
);

CREATE TABLE views (
  slug TEXT PRIMARY KEY,
  count INT NOT NULL
);
```

## License

1. You are free to use this code as inspiration.
2. Please do not copy it directly.
3. Crediting the author is appreciated.

Please remove all of my personal information (blog posts, images, etc.) by running `bun run setup`.
