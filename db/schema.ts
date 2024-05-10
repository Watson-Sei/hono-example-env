import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const todos = sqliteTable('todos', {
    id: integer('id', {mode: 'number'}).primaryKey({autoIncrement: true}),
    content: text('content'),
    isCompleted: integer('isCompleted', {mode: 'boolean'}).notNull().default(false),
});