import type { User, Document, PaginatedQuery, PaginatedResponse } from '.'

export interface Team extends Document {
  name: string
  members: User[]
  active: boolean
  color: string
  initials: string
  owner: User
}

export type GetTeamsQuery = PaginatedQuery
export type GetTeamsResponse = PaginatedResponse<Team>
export type CreateTeamPayload = Partial<Team>
