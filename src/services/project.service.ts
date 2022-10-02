import type { CreateProjectPayload, Project, GetProjectsQuery, GetProjectsResponse } from '../types/project'

export default class ProjectService {
  static uri = '/projects'

  static createProject = (project: CreateProjectPayload) => api.post<Project>(this.uri, project)
  static getProjects = (query?: GetProjectsQuery) => api.get<GetProjectsResponse>(this.uri, { params: query })
  static getProjectById = (id: string) => api.get<Project>(`${this.uri}/${id}`)
  static updateProjectById = (id: string, body: Project) => api.patch<Project>(`${this.uri}/${id}`, body)
  static deleteProjectById = (id: string) => api.delete<Project>(`${this.uri}/${id}`)
}
