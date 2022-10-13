import type { Document, PaginatedQuery, PaginatedResponse, TeamMember, User } from 'types'

export interface Team extends Document {
  name: string
  members: TeamMember[]
  active: boolean
  color: string
  initials: string
  owner: User
}

export type GetTeamsQuery = PaginatedQuery
export type GetTeamsResponse = PaginatedResponse<Team>
export type CreateTeamPayload = Partial<Team>
