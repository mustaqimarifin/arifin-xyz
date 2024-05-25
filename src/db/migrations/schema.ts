import {
  pgTable,
  pgEnum,
  text,
  timestamp,
  boolean,
  jsonb,
  integer,
  index,
  serial,
  primaryKey,
  bigint,
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const ROLE = pgEnum('ROLE', ['BLOCKED', 'USER', 'ADMIN'])
export const bookmark_type = pgEnum('bookmark_type', [
  'article',
  'blog',
  'video',
  'bodoh',
])
export const stack_type = pgEnum('stack_type', [
  'code',
  'productivity',
  'music',
  'misc',
])
export const user_role = pgEnum('user_role', ['user', 'admin', 'blocked'])

export const session = pgTable('session', {
  id: text('id')
    .default(sql`nanoid()`)
    .primaryKey()
    .notNull(),
  user_id: text('user_id')
    .notNull()
    .references(() => usr.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  session_token: text('session_token').notNull(),
})

export const bookmark = pgTable('bookmark', {
  id: text('id')
    .default(sql`nanoid()`)
    .notNull(),
  type: bookmark_type('type'),
  name: text('name'),
  url: text('url'),
  description: text('description'),
  featured: boolean('featured'),
  image: text('image'),
  date: timestamp('date', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
})

export const tweet = pgTable('tweet', {
  key: text('key').primaryKey().notNull(),
  value: jsonb('value').notNull(),
})

export const view = pgTable('view', {
  slug: text('slug').primaryKey().notNull(),
  count: integer('count').notNull(),
})

export const usr = pgTable('usr', {
  id: text('id')
    .default(sql`nanoid()`)
    .primaryKey()
    .notNull(),

  name: text('name'),
  email: text('email'),
  email_verified: timestamp('email_verified', {
    withTimezone: true,
    mode: 'string',
  }),
  image: text('image'),
  role: ROLE('role').default('USER').notNull(),
})

export const comment = pgTable(
  'comment',
  {
    id: text('id')
      .default(sql`nanoid()`)
      .notNull(),
    user_id: text('user_id')
      .notNull()
      .references(() => usr.id, { onDelete: 'cascade' }),
    parent_id: text('parent_id'),
    slug: text('slug').notNull(),
    body: text('body'),
    date: timestamp('date', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      slug_idx: index('comment_slug_idx').on(table.slug),
      user_idx: index('comment_user_idx').on(table.user_id),
    }
  }
)

export const guestbook = pgTable('guestbook', {
  id: serial('id').primaryKey().notNull(),
  user_id: text('user_id')
    .notNull()
    .references(() => usr.id, { onDelete: 'cascade' }),
  body: text('body'),
  date: timestamp('date', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
})

export const verification_token = pgTable(
  'verification_token',
  {
    identifier: text('identifier').notNull(),
    expires: timestamp('expires', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    token: text('token').notNull(),
  },
  (table) => {
    return {
      verification_token_pkey: primaryKey({
        columns: [table.identifier, table.token],
        name: 'verification_token_pkey',
      }),
    }
  }
)

export const account = pgTable(
  'account',
  {
    id: text('id')
      .default(sql`nanoid()`)
      .notNull(),
    user_id: text('user_id')
      .notNull()
      .references(() => usr.id, { onDelete: 'cascade' }),
    type: text('type').notNull(),
    provider: text('provider').notNull(),
    provider_acc_id: text('provider_acc_id').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    expires_at: bigint('expires_at', { mode: 'number' }),
    id_token: text('id_token'),
    scope: text('scope'),
    session_state: text('session_state'),
    token_type: text('token_type'),
  },
  (table) => {
    return {
      account_pkey: primaryKey({
        columns: [table.provider, table.provider_acc_id],
        name: 'account_pkey',
      }),
    }
  }
)

export type Comment = typeof comment.$inferSelect // return type when queried
