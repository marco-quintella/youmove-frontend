import { api } from 'src/boot/axios'
import type { GetTeamsQuery, GetTeamsResponse, Team } from 'src/types/team.d'
import { CreateTeamPayload } from '../types/team'

export default class TeamService {
  static uri = '/teams'

  static createTeam = (team: CreateTeamPayload) => api.post<Team>(this.uri, team)
  static getTeams = (query?: GetTeamsQuery) => api.get<GetTeamsResponse>(this.uri, { params: query })
  static getTeamById = (id: string) => api.get<Team>(`${this.uri}/${id}`)
  static updateTeamById = (id: string, body: Partial<Team>) => api.patch<Team>(`${this.uri}/${id}`, body)
  static deleteTeamById = (id: string) => api.delete<Team>(`${this.uri}/${id}`)
}
