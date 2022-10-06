import { CreateCategoryPayload, Category, GetCategoriesQuery, GetCategoriesResponse } from '../types/category'

export default class CategoryService {
  static uri = '/categories'

  static create = (category: CreateCategoryPayload) => api.post<Category>(this.uri, category)
  static getById = (id: string) => api.get<Category>(`${this.uri}/${id}`)
  static get = (query: GetCategoriesQuery) => api.get<GetCategoriesResponse>(this.uri, { params: query })
}
