import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const spacesTable = sqliteTable('spaces', {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  description: text(),
  jsonContent: text().notNull().default('{}'),
  created_at: int().notNull(),
  updated_at: int().notNull()
})
