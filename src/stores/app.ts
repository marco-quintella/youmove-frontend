import { defineStore } from 'pinia'
import ProjectService from '../services/project.service'
import type { Project, Team } from '../types'

export const useAppStore = defineStore('app', () => {
  const route = useRoute()
  const authStore = useAuthStore()

  let globalLoading = $ref(false)
  let isDrawerOpen = $ref(false)
  let teams = $ref<Team[]>([])
  let projects = $ref<Project[]>([])

  const activeCategory = $computed(() => {
    if (!route.params.categoryId)
      return null
    return projects.find(project => project.categories.find(category => category.id === route.params.categoryId))
  })

  const activeTeam = $computed(() => {
    if (!activeCategory)
      return null

    return teams.find(team => team.id === activeCategory.team.id)
  })

  const activeMember = $computed(() => {
    if (!activeTeam)
      return null

    return activeTeam.members.find(member => member.user.id === authStore.user?.id)
  })

  function setGlobalLoading(value: boolean) {
    globalLoading = value
  }

  function setDrawerOpen(value: boolean) {
    isDrawerOpen = value
  }

  async function getUserTeams() {
    try {
      const _teams = await teamService.getTeams()
      const lastPage = _teams.data.totalPages
      const result = _teams.data.results
      if (lastPage > 1) {
        for (let i = 2; i <= lastPage; i++) {
          const newTeams = await teamService.getTeams({ page: i })
          result.push(...newTeams.data.results)
        }
      }
      teams = result
    }
    catch (error) {
      console.error(error)
    }
  }

  async function getUserProjects() {
    try {
      const { data } = await ProjectService.getProjects()
      const lastPage = data.totalPages
      const result = data.results
      if (lastPage > 1) {
        for (let i = 2; i <= lastPage; i++) {
          const newProjects = await ProjectService.getProjects({ page: i })
          result.push(...newProjects.data.results)
        }
      }
      projects = result
    }
    catch (error) {
      console.error(error)
    }
  }

  return $$({
    activeMember,
    activeTeam,
    activeCategory,
    globalLoading,
    isDrawerOpen,
    teams,
    projects,
    setGlobalLoading,
    setDrawerOpen,
    getUserTeams,
    getUserProjects,
  })
})
