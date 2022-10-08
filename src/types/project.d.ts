import type { Team, User, Category, Folder, PaginatedQuery, PaginatedResponse, Document } from '.'

export interface Project extends Document {
  name: string
  active: boolean
  color: string
  team: Team
  owner: User
  initials: string
  categories: Category[]
  folders: Folder[]
}

export type GetProjectsQuery = PaginatedQuery
export type GetProjectsResponse = PaginatedResponse<Project>
export interface CreateProjectPayload extends Partial<Omit<Project, 'team'>> {
  team?: string
}
