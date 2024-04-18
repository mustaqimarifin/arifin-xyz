import type { users } from "@/db/schema";
import type { AdapterUser } from "@auth/core/adapters";
import NextAuth, { type DefaultSession, Session, User } from "next-auth";

type UserRole = ["USER", "ADMIN"];

declare module "next-auth" {
	interface Session {
		user: {
			/**
			 * Returned by `useViewerQuery`, `getSession` and received as a prop on the `SessionProvider` React Context
			 */
			id: string;
			role: UserRole | undefined;
		} & DefaultSession["user"];
		userId: string;
	}

	interface User extends AdapterUser {
		role: UserRole | undefined;
	}
}
