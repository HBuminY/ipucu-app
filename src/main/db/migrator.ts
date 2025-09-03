import { Migrator, FileMigrationProvider } from 'kysely'
import { promises as fs } from 'fs'
import path from 'path'
import { db } from './index' // Assuming db is exported from index.ts

export async function runMigrations(): Promise<void> {
  const migrationFolder =
    process.env.NODE_ENV === 'development'
      ? path.join(__dirname, './migrations')
      : path.join(process.resourcesPath, 'app.asar.unpacked', 'dist', 'main', 'db', 'migrations')

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder
    })
  })

  const { error, results } = await migrator.migrateToLatest()

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`Migration "${it.migrationName}" was executed successfully`)
    } else if (it.status === 'Error') {
      console.error(`Failed to execute migration "${it.migrationName}"`)
    }
  })

  if (error) {
    console.error('Failed to migrate')
    console.error(error)
    process.exit(1)
  }
}
