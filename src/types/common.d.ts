export interface Timestamps {
  createdAt?: string
  updatedAt?: string
}

export interface Document extends Timestamps {
  _id?: string
}

export interface PaginatedResponse<T> {
  results: T[]
  page: number
  limit: number
  totalPages: number
  totalResults: number
}

export interface PaginatedQuery {
  sortBy?: string
  limit?: number
  page?: number
}
