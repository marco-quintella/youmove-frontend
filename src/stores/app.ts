import { defineStore } from 'pinia'

export const useStore = defineStore('app', {
  state: () => ({
    globalLoading: false,
    isDrawerOpen: true
  }),
  actions: {
    setGlobalLoading (value: boolean) {
      this.globalLoading = value
    },
    setDrawerOpen (value: boolean) {
      this.isDrawerOpen = value
    }
  }
})
