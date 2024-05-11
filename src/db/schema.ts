import { sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable('users', {
    id: integer('id', {mode: 'number'}).primaryKey({autoIncrement: true}),
    username: text('username').unique().notNull(),
    passwordHash: text('passwordHash').notNull(),
    createdAt: text('createdAt').notNull().default(sql`(current_timestamp)`)
});