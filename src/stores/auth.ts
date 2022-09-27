import { RegisterBody, LoginBody } from 'src/types/auth.d'
import { AuthTokens } from './../types/auth.d'
import { User } from './../types/user.d'
import { LocalStorage } from 'quasar'
import { defineStore } from 'pinia'
import AuthService from 'src/services/auth.service'
import { tryCatch } from 'src/utils/error-handling'

export const useAuthStore = defineStore<'auth', {
  isAuthicated: boolean
  user: User | null
  tokens: AuthTokens | null
}>('auth', {
  state: () => ({
    isAuthicated: false,
    user: null,
    tokens: null
  }),
  actions: {
    async register (user: RegisterBody) {
      tryCatch(async () => {
        const { data } = await AuthService.register(user)
        this.user = data.user
        this.tokens = data.tokens
      })
    },
    async login (user: LoginBody) {
      tryCatch(async () => {
        const { data } = await AuthService.login(user)
        this.user = data.user
        this.tokens = data.tokens
      })
    },
    async logout () {
      tryCatch(async () => {
        if (!this.tokens || !this.tokens.refresh || !this.tokens.refresh.token) return
        await AuthService.logout(this.tokens.refresh.token)
        this.user = null
        this.tokens = null
      })
    },
    async refreshTokens () {
      tryCatch(async () => {
        if (!this.tokens || !this.tokens.refresh || !this.tokens.refresh.token) return
        const { data } = await AuthService.refreshTokens(this.tokens.refresh.token)
        this.tokens = data
      })
    },
    async forgotPassword (email: string) {
      tryCatch(async () => { await AuthService.forgotPassword(email) })
    },
    async resetPassword (password: string, token: string) {
      tryCatch(async () => { await AuthService.resetPassword(password, token) })
    },
    async sendVerificationEmail () {
      tryCatch(async () => { await AuthService.sendVerificationEmail() })
    },
    async verifyEmail (token: string) {
      tryCatch(async () => { await AuthService.verifyEmail(token) })
    }
  }
})
