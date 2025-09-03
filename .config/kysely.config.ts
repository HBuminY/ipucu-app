import { DummyDriver, SqliteAdapter, SqliteIntrospector, SqliteQueryCompiler } from 'kysely'
import { defineConfig } from 'kysely-ctl'

export default defineConfig({
  // replace me with a real dialect instance OR a dialect name + `dialectConfig` prop.
  dialect: {
    createAdapter() {
      return new SqliteAdapter()
    },
    createDriver() {
      return new DummyDriver()
    },
    createIntrospector(db) {
      return new SqliteIntrospector(db)
    },
    createQueryCompiler() {
      return new SqliteQueryCompiler()
    }
  },
  migrations: {
    migrationFolder: '../src/main/db/migrations'
  },
  plugins: [],
  seeds: {
    seedFolder: '../src/main/db/seeds'
  }
})
