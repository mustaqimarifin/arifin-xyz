import type { AdapterAccount } from "@auth/core/adapters";
import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("user", {
	id: text("id").notNull().primaryKey(),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
	image: text("image"),
	role: text("role", { enum: ["USER", "ADMIN"] }).default("USER"),
});

export const accounts = sqliteTable(
	"account",
	{
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		type: text("type").$type<AdapterAccount["type"]>().notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("providerAccountId").notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type"),
		scope: text("scope"),
		id_token: text("id_token"),
		session_state: text("session_state"),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
	}),
);

export const sessions = sqliteTable("session", {
	sessionToken: text("sessionToken").notNull().primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const verificationTokens = sqliteTable(
	"verificationToken",
	{
		identifier: text("identifier").notNull(),
		token: text("token").notNull(),
		expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
	}),
);

export const views = sqliteTable("view", {
	slug: text("slug").primaryKey(),
	count: integer("count").notNull(),
});

export const guestbook = sqliteTable("guestbook", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	body: text("body"),
	date: integer("date", { mode: "timestamp_ms" }).notNull(),
});

//export type InsertGB = InferInsertModel<typeof guestbook>;
export type InsertGB = typeof guestbook.$inferInsert;
export type SelectGB = typeof guestbook.$inferSelect;

export type SelectUser = typeof users.$inferSelect;

export type SelectGBEntry = SelectGB & SelectUser;
