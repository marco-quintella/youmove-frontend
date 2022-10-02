import { defineStore } from 'pinia'
import ProjectService from '../services/project.service'
import type { Project, Team } from '../types'

export const useAppStore = defineStore('app', {
  state: () => ({
    globalLoading: false,
    isDrawerOpen: false,
    teams: [] as Team[],
    projects: [] as Project[]
  }),
  actions: {
    setGlobalLoading (value: boolean) {
      this.globalLoading = value
    },
    setDrawerOpen (value: boolean) {
      this.isDrawerOpen = value
    },
    async getUserTeams () {
      const teams = await teamService.getTeams()
      const lastPage = teams.data.totalPages
      const result = teams.data.results
      if (lastPage > 1) {
        for (let i = 2; i <= lastPage; i++) {
          const newTeams = await teamService.getTeams({ page: i })
          result.push(...newTeams.data.results)
        }
      }
      this.teams = result
    },
    async getUserProjects () {
      const { data } = await ProjectService.getProjects()
      const lastPage = data.totalPages
      const result = data.results
      if (lastPage > 1) {
        for (let i = 2; i <= lastPage; i++) {
          const newProjects = await ProjectService.getProjects({ page: i })
          result.push(...newProjects.data.results)
        }
      }
      this.projects = result
    }
  }
})
