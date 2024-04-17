import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";

import { db } from "@/db";
import { SQLiteDrizzleAdapter } from "@/db/adapter";
import type { DefaultSession } from "@auth/core/types";

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	adapter: SQLiteDrizzleAdapter(db),
	providers: [GitHub, Google, Twitter],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.sub = user.id;
			}
			return token;
		},
		async session({ session, user }) {
			session.userId = user.id;
			return session;
		},
	},
	/*   pages: {
    signIn: "/sign-in",
  }, */
});

declare module "next-auth" {
	interface Session {
		user: {
			/**
			 * Returned by `useViewerQuery`, `getSession` and received as a prop on the `SessionProvider` React Context
			 */
			id: string;
		} & DefaultSession["user"];
		userId: string;
	}
}
