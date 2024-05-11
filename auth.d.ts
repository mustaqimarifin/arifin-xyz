import type { users } from "@/db/pg-schema";
import type { AdapterUser } from "@auth/core/adapters";
import NextAuth, { type DefaultSession, Session, User } from "next-auth";

type UserRole = ["blocked", "user", "admin"];

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
