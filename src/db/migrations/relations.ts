import { usr, session, comment, guestbook, account } from './schema'
import { relations } from 'drizzle-orm/relations'

export const sessionRelations = relations(session, ({ one }) => ({
  usr: one(usr, {
    fields: [session.user_id],
    references: [usr.id],
  }),
}))

export const usrRelations = relations(usr, ({ many }) => ({
  sessions: many(session),
  comments: many(comment),
  guestbooks: many(guestbook),
  accounts: many(account),
}))

export const commentRelations = relations(comment, ({ one }) => ({
  usr: one(usr, {
    fields: [comment.user_id],
    references: [usr.id],
  }),
}))

export const guestbookRelations = relations(guestbook, ({ one }) => ({
  usr: one(usr, {
    fields: [guestbook.user_id],
    references: [usr.id],
  }),
}))

export const accountRelations = relations(account, ({ one }) => ({
  usr: one(usr, {
    fields: [account.user_id],
    references: [usr.id],
  }),
}))
