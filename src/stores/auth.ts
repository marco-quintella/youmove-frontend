import type { AuthTokens, LoginBody, RegisterBody } from './../types/auth.d'
import type { User } from './../types/user.d'
import { defineStore } from 'pinia'
import AuthService from 'src/services/auth.service'
import { tryCatch } from 'src/utils/error-handling'
import { Loading, LocalStorage } from 'quasar'
import isAfter from 'date-fns/isAfter'

Loading.show()
let localTokens = LocalStorage.getItem('tokens') as AuthTokens | undefined
let localUser = LocalStorage.getItem('user') as User | undefined
if (!!localTokens && localTokens.access && localTokens.access.expires) {
  if (isAfter(new Date(), new Date(localTokens.access.expires))) {
    localTokens = undefined
    localUser = undefined
  }
}
Loading.hide()

function saveTokensOnLocalStorage (tokens: AuthTokens) {
  LocalStorage.set('tokens', tokens)
}

function saveUserOnLocalStorage (user: User) {
  LocalStorage.set('user', user)
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: ((localUser as User) || null) as User | null,
    tokens: ((localTokens as AuthTokens) || null) as AuthTokens | null
  }),
  getters: {
    isAuthenticated: (state) => !!state.user && !!state.tokens
  },
  actions: {
    async register (user: RegisterBody) {
      tryCatch(async () => {
        const { data } = await AuthService.register(user)
        this.user = data.user
        this.tokens = data.tokens
        saveTokensOnLocalStorage(data.tokens)
        saveUserOnLocalStorage(data.user)
      })
    },
    async login (user: LoginBody) {
      tryCatch(async () => {
        const { data } = await AuthService.login(user)
        this.user = data.user
        this.tokens = data.tokens
        saveTokensOnLocalStorage(data.tokens)
        saveUserOnLocalStorage(data.user)
      })
    },
    async logout () {
      tryCatch(async () => {
        if (!this.tokens || !this.tokens.refresh || !this.tokens.refresh.token) return
        await AuthService.logout(this.tokens.refresh.token)
        this.user = null
        this.tokens = null
        LocalStorage.remove('tokens')
        LocalStorage.remove('user')
      })
    },
    async refreshTokens () {
      tryCatch(async () => {
        if (!this.tokens || !this.tokens.refresh || !this.tokens.refresh.token) return
        const { data } = await AuthService.refreshTokens(this.tokens.refresh.token)
        this.tokens = data
        saveTokensOnLocalStorage(data)
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
