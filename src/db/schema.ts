import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const codeSnippet = sqliteTable('code_snippet', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  code: text('code').notNull(),
  language: text('language').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const analysis = sqliteTable('analysis', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  snippetId: integer('snippet_id').notNull().references(() => codeSnippet.id, { onDelete: 'cascade' }),
  analysisType: text('analysis_type').notNull(),
  prompt: text('prompt').notNull(),
  response: text('response').notNull(),
  createdAt: text('created_at').notNull(),
});
