import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { gitID, gitSecret } from "./utils/env";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GitHub({
      clientId: gitID,
      clientSecret: gitSecret,
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
});
