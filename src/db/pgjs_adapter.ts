import type {
  Adapter,
  AdapterUser,
  VerificationToken,
  AdapterSession,
} from '@auth/core/adapters'
import type { SQL } from '.'

export function mapExpiresAt(account: any): any {
  const expires_at: number = parseInt(account.expires_at)
  return {
    ...account,
    expires_at,
  }
}

/* const user = {
  name: 'Murray',
  age: 68
}

await sql`
  insert into users ${
    sql(user, 'name', 'age')
  }
`

// Which results in:
insert into users ("name", "age") values ($1, $2)

// The columns can also be given with an array
const columns = ['name', 'age']

await sql`
  insert into users ${
    sql(user, columns)
  }
` */

//type TSAdapter = Omit<Adapter, 'role'>
export default function PostgresJSAdapter(sql: SQL): Adapter {
  return {
    async createVerificationToken(
      verificationToken: VerificationToken
    ): Promise<VerificationToken> {
      //const { identifier, expires, token } = verificationToken
      await sql`
      INSERT INTO verification_token ${sql(verificationToken)} returning *`
      //await sql(sql, [identifier, expires, token])
      return verificationToken
    },
    async useVerificationToken({
      identifier,
      token,
    }: {
      identifier: string
      token: string
    }): Promise<VerificationToken> {
      const res = await sql`delete from verification_token
      where identifier = ${identifier} and token = ${token}
      RETURNING identifier, expires, token `
      //.const result = await sql(sql, [identifier, token])
      return res[0] as VerificationToken //.rowCount !== 0 ? result.rows[0] : null
    },
    async createUser(user: Omit<AdapterUser, 'id'>) {
      //const { name, email, emailVerified, image } = user
      const res = await sql`
        INSERT INTO users  ${sql(user)} 
        RETURNING id, name, email, "emailVerified", image`

      return res[0] as AdapterUser
    },
    async getUser(id) {
      const users = await sql`SELECT * FROM users WHERE id = ${id}`
      if (!users.length) throw new Error('Not found')
      return users[0] as AdapterUser
    },
    async getUserByEmail(email) {
      const res = await sql`select * from users where email = ${email}`
      return res[0] as AdapterUser
    },
    async getUserByAccount({
      providerAccountId,
      provider,
    }): Promise<AdapterUser | null> {
      const res = await sql`
          select u.* from users u join accounts a on u.id = a."userId"
          where 
          a.provider = ${provider}
          and 
          a."providerAccountId" = ${providerAccountId}`

      if (!res.length) return null
      return res[0] as AdapterUser
    },
    async updateUser(user) {
      const userId = user.id!
      //const fetchSql = `select * from users where id = $1`
      const query1 = await sql`select * from users where id = ${userId}`
      const oldUser = query1[0]

      const newUser = {
        ...oldUser,
        ...user,
      }
      const query2 = await sql`update users set ${sql(newUser)}
  where id = ${newUser.id} RETURNING name, id, email, "emailVerified", image`
      return query2[0] as AdapterUser
    },

    async linkAccount(account) {
      const linkUp = await sql`insert into accounts 
      ${sql(account)} returning *`
      return mapExpiresAt(linkUp[0])
    },
    async createSession(session) {
      if (session?.userId === undefined) {
        throw Error(`userId is undef in createSession`)
      }
      return await sql`insert into sessions ${sql(session)}
      RETURNING id, "sessionToken", "userId", expires`.then(
        (res) => res[0] as AdapterSession
      )
    },
    async getSessionAndUser(sessionToken: string): Promise<{
      session: AdapterSession
      user: AdapterUser
    } | null> {
      if (sessionToken === undefined) {
        return null
      }
      const res = await sql`
      select
  s."sessionToken",
  s."userId",
  s.expires,
  u.id,
  u.name,
  u.email,
  u."emailVerified",
  u.image
from
  sessions s
  inner join users u on u.id = s."userId"
where s."sessionToken" = ${sessionToken}`
      return res[0] as { session: AdapterSession; user: AdapterUser }
    },
    async updateSession(
      session: Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>
    ): Promise<AdapterSession | null | undefined> {
      const { sessionToken } = session
      const result1 =
        await sql`select * from sessions where "sessionToken" = ${sessionToken}`
      if (!result1.length) {
        return null
      }
      const originalSession = result1[0] as AdapterSession

      const newSession: AdapterSession = {
        ...originalSession,
        ...session,
      }
      await sql`
        UPDATE sessions set
        expires = ${newSession.expires}
        where "sessionToken" = ${newSession.sessionToken}
        `

      return result1[0] as AdapterSession
    },
    async deleteSession(sessionToken) {
      await sql`delete from sessions where "sessionToken" = ${sessionToken}`
    },
    async unlinkAccount(partialAccount) {
      const { provider, providerAccountId } = partialAccount
      await sql`delete from accounts 
      where "providerAccountId" = ${providerAccountId} 
      and provider = ${provider}`
    },
    async deleteUser(userId: string) {
      await sql`delete from users where id = ${userId}`
      await sql`delete from sessions where "userId" = ${userId}`
      await sql`delete from accounts where "userId" = ${userId}`
    },
  }
}
