import { Document, PaginatedQuery, PaginatedResponse } from './common'

export interface Category extends Document {
  name: string
  color: string
}

export interface GetCategoriesQuery extends Partial<Category>, Partial<PaginatedQuery> { }
export type GetCategoriesResponse = PaginatedResponse<Category>
export interface CreateCategoryPayload {
  category: Partial<Category>
  projectId: string
}
