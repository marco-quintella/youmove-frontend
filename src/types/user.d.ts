export interface User {
  email?: string
  name?: string
  password?: string
  role?: string
  isEmailVerified?: boolean
}

export interface GetUsersQuery {
  name?: string
  role?: string
  sortBy?: string
  limit?: number
  page?: number
}

export interface GetUsersResponse {
  results: User[]
  page: number
  limit: number
  totalPages: number
  totalResults: number
}

export interface UpdateUserParams {
  userId: string
}

export interface UpdateUserBody {
  email?: string
  password?: string
  name?: string
}

export interface DeleteUserParams {
  userId: string
}
