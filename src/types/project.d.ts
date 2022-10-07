import { Document, PaginatedQuery, PaginatedResponse } from './common'
import { Team } from './team'
import { User } from './user'

export interface Project extends Document {
  name: string
  active: boolean
  color: string
  team: Team
  owner: User
  initials: string
}

export type GetProjectsQuery = PaginatedQuery
export type GetProjectsResponse = PaginatedResponse<Project>
export interface CreateProjectPayload extends Partial<Omit<Project, 'team'>> {
  team?: string
}
