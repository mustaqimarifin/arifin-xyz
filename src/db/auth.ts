//import type { Adapter } from '@auth/core/adapters'
import Twitter from 'next-auth/providers/twitter'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
//import PostgresAdapter from './node_pg_adapter'
import PostgresJSAdapter from './pgjs_adapter'
import { fuckyouID } from '@/utils/genID'
import NextAuth from 'next-auth'
import { sql } from '.'

//import {SxAdapter} from './pg-adapter'
//import PostgresAdapter from './pg_adapter_nextauth'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  debug: true,
  adapter: PostgresJSAdapter(sql) as any,
  providers: [GitHub, Google, Twitter],
  session: {
    generateSessionToken: () => {
      return `wHoDisB1Tch${fuckyouID(4)}`
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
      }
      return token
    },
    async session({ session, user }) {
      session.user.id = user.id
      session.user.role = user.role
      return session
    },
  },
  /*   pages: {
    signIn: "/sign-in",
  }, */
})

enum Role {
  admin = 'admin',
  blocked = 'blocked',
  user = 'user',
}

export type UserRole = keyof typeof Role
