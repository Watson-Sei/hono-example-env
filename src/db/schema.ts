import { sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable('users', {
    id: integer('id', {mode: 'number'}).primaryKey({autoIncrement: true}),
    username: text('username').unique().notNull(),
    passwordHash: text('passwordHash').notNull(),
    createdAt: text('createdAt').notNull().default(sql`(current_timestamp)`)
});

export const todos = sqliteTable('todos', {
    id: integer('id', {mode: 'number'}).primaryKey({autoIncrement: true}),
    title: text('title').unique().notNull(),
    description: text('description').notNull(),
    isCompleted: integer('isCompleted', {mode: 'boolean'}).default(false).notNull(),
    creatorId: integer('creatorId').references(() => users.id).notNull(),
    assigneeId: integer('assigneeId').references(() => users.id),
    createdAt: text('createdAt').notNull().default(sql`(current_timestamp)`)
});