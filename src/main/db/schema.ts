import {
  ColumnType,
  Generated,
  Insertable,
  /*JSONColumnType,*/
  Selectable,
  Updateable
} from 'kysely'

export interface Database {
  spaces: SpacesTable
}

export interface SpacesTable {
  id: Generated<number>
  title: string
  description: string | null

  created_at: ColumnType<Date, string | undefined, never>
  updated_at: ColumnType<Date, string | undefined, never>
}
export type Spaces = Selectable<SpacesTable>
export type NewSpaces = Insertable<SpacesTable>
export type SpacesUpdate = Updateable<SpacesTable>
