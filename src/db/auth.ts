import { db } from "@/db";
import { xId } from "@/db/nanoid";
//import {SQLiteDrizzleAdapter} from '@/db/sqlite-adapter'
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";
import { PostgresDrizzleAdapter } from "./pg-adapter";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  //adapter: SQLiteDrizzleAdapter(db),
  //@ts-expect-errors
  adapter: PostgresDrizzleAdapter(db),
  providers: [GitHub, Google, Twitter],
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Status update every 24hrs
    generateSessionToken: () => {
      return `wHoDisB1Tch${xId()}`;
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, user }) {
      session.userId = user.id;
      session.user.role = user.role;
      return session;
    },
  },
  /*   pages: {
    signIn: "/sign-in",
  }, */
});
