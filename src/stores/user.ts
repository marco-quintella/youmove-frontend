import { GetUsersQuery } from './../types/user.d'
import { useAuthStore } from 'src/stores/auth'
import { RegisterBody, LoginBody } from 'src/types/auth.d'
import { AuthTokens } from '../types/auth'
import { User } from '../types/user'
import { LocalStorage } from 'quasar'
import { defineStore } from 'pinia'
import AuthService from 'src/services/auth.service'
import UserService from 'src/services/user.service'

const authStore = useAuthStore()

export const useUserStore = defineStore<'user', {
  users: User[] | null
}>('user', {
  state: () => ({
    users: null
  }),
  actions: {
    async createUser (user: RegisterBody) {
      const { data } = await UserService.createUser(user)
      return data
    },
    async getUsers (query: GetUsersQuery) {
      const { data } = await UserService.getUsers(query)
      this.users = data.results

      return data
    },
    async getUserById (userId: string) {
      const { data } = await UserService.getUserById(userId)
      return data
    },
    async updateUser (userId: string, user: User) {
      const { data } = await UserService.updateUserById(userId, user)
      return data
    },
    async deleteUser (userId: string) {
      await UserService.deleteUserById({ userId })
    }
  }
})
