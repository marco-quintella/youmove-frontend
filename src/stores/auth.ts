import type { AuthTokens, LoginBody, RegisterBody } from './../types/auth.d'
import type { User } from './../types/user.d'
import { defineStore } from 'pinia'
import AuthService from 'src/services/auth.service'
import { tryCatch } from 'src/utils/error-handling'
import { LocalStorage } from 'quasar'

export const useAuthStore = defineStore('auth', () => {
  const localAuth = LocalStorage.getItem('tokens') as AuthTokens | undefined
  const localUser = LocalStorage.getItem('user') as User | undefined

  const user = ref(localUser)
  const tokens = ref(localAuth)
  const isAuthenticated = computed(() => !!user && !!tokens)

  const register = async (_user: RegisterBody) => {
    tryCatch(async () => {
      const { data } = await AuthService.register(_user)
      tokens.value = data.tokens
      user.value = data.user
    })
  }

  const login = async (_user: LoginBody) => {
    tryCatch(async () => {
      const { data } = await AuthService.login(_user)
      tokens.value = data.tokens
      user.value = data.user
    })
  }

  const logout = async () => {
    tryCatch(async () => {
      if (!tokens.value || !tokens.value.refresh || !tokens.value.refresh.token) return
      await AuthService.logout(tokens.value.refresh.token)
      LocalStorage.remove('tokens')
      LocalStorage.remove('user')
      tokens.value = undefined
      user.value = undefined
    })
  }

  const refreshTokens = async () => {
    tryCatch(async () => {
      if (!tokens.value || !tokens.value.refresh || !tokens.value.refresh.token) return
      const { data } = await AuthService.refreshTokens(tokens.value.refresh.token)
      tokens.value = data
    })
  }

  const forgotPassword = async (email: string) => {
    tryCatch(async () => {
      await AuthService.forgotPassword(email)
    })
  }

  const resetPassword = async (password: string, token: string) => {
    tryCatch(async () => {
      await AuthService.resetPassword(password, token)
    })
  }

  const sendVerificationEmail = async () => {
    tryCatch(async () => {
      await AuthService.sendVerificationEmail()
    })
  }

  const verifyEmail = async (token: string) => {
    tryCatch(async () => {
      await AuthService.verifyEmail(token)
    })
  }

  return {
    user,
    tokens,
    isAuthenticated,
    register,
    login,
    logout,
    refreshTokens,
    forgotPassword,
    resetPassword,
    sendVerificationEmail,
    verifyEmail
  }
})
