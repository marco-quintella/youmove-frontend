import type { Document, PaginatedResponse, PaginatedQuery } from '.'

export interface User extends Document {
  email: string
  name: string
  password: string
  role: string
  isEmailVerified: boolean
  initials: string
  color: string
}

export interface GetUsersQuery extends User, PaginatedQuery { }
export type GetUsersResponse = PaginatedResponse<User>

export interface UpdateUserParams {
  userId: string
}
