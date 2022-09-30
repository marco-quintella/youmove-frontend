import { PaginatedQuery, PaginatedResponse } from './common'
import { User } from './user.d'
export interface Team extends Document {
  name?: string
  members?: User[]
  active?: boolean
}

export interface GetTeamsQuery extends Team, PaginatedQuery { }
export type GetTeamsResponse = PaginatedResponse<Team>
