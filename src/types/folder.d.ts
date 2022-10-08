import type { Category, Document } from '.'

export interface Folder extends Document {
  id: string
  name: string
  color: string
  categories: Category[]
}
