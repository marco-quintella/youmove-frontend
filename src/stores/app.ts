import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'
import ProjectService from '../services/project.service'
import type { Project, Team } from '../types'

export const useAppStore = defineStore('app', () => {
  const route = useRoute()

  const globalLoading = ref(false)
  const isDrawerOpen = ref(false)
  const teams = ref<Team[]>([])
  const projects = ref<Project[]>([])

  const activeCategory = computed(() => {
    if (!route.params.categoryId)
      return null
    return projects.value.find(project => project.categories.find(category => category.id === route.params.categoryId))
  })

  function setGlobalLoading(value: boolean) {
    globalLoading.value = value
  }

  function setDrawerOpen(value: boolean) {
    isDrawerOpen.value = value
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
      teams.value = result
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
      projects.value = result
    }
    catch (error) {
      console.error(error)
    }
  }

  return {
    activeCategory,
    globalLoading,
    isDrawerOpen,
    teams,
    projects,
    setGlobalLoading,
    setDrawerOpen,
    getUserTeams,
    getUserProjects,
  }
})
