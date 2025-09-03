import type { Kysely } from 'kysely'
import { type Database } from '../schema'

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable('spaces')
    .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('title', 'text', (col) => col.notNull())
    .addColumn('description', 'text')
    .addColumn('created_at', 'text', (col) => col.defaultTo('CURRENT_TIMESTAMP').notNull())
    .addColumn('updated_at', 'text', (col) => col.defaultTo('CURRENT_TIMESTAMP').notNull())
    .execute()
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable('spaces').execute()
}
