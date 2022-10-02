import { defineStore } from 'pinia'
import type { Team } from '../types/team'

export const useAppStore = defineStore('app', {
  state: () => ({
    globalLoading: false,
    isDrawerOpen: false,
    teams: [] as Team[]
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
      return result
    }
  }
})
