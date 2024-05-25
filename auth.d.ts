import type { AdapterUser } from '@auth/core/adapters'
import { type DefaultSession } from 'next-auth'
import type { UserRole } from '@/db/auth'

declare module 'next-auth' {
  interface Session {
    user: {
      /**
       * Returned by `useViewerQuery`, `getSession` and received as a prop on the `SessionProvider` React Context
       */
      id: string
      role: UserRole
      location?: string
    } & DefaultSession['user']
    //userId: string
  }
  interface User extends AdapterUser {
    role: UserRole
  }
}
