import type { AuthTokens, LoginBody, RegisterBody } from './../types/auth.d'
import type { User } from './../types/user.d'
import { defineStore } from 'pinia'
import AuthService from 'src/services/auth.service'
import { LocalStorage } from 'quasar'

export const useAuthStore = defineStore('auth', () => {
  const localAuth = LocalStorage.getItem('tokens') as AuthTokens | undefined
  const localUser = LocalStorage.getItem('user') as User | undefined

  const user = ref(localUser)
  const tokens = ref(localAuth)

  const fetchLocalStorage = () => {
    user.value = LocalStorage.getItem('user') as User
    tokens.value = LocalStorage.getItem('tokens') as AuthTokens
  }

  const register = async (_user: RegisterBody) => {
    try {
      const { data } = await AuthService.register(_user)
      LocalStorage.set('tokens', data.tokens)
      LocalStorage.set('user', data.user)
      tokens.value = data.tokens
      user.value = data.user
    } catch (error) {
      console.error(error)
    }
  }

  const login = async (_user: LoginBody) => {
    try {
      const { data } = await AuthService.login(_user)
      LocalStorage.set('tokens', data.tokens)
      LocalStorage.set('user', data.user)
      tokens.value = data.tokens
      user.value = data.user
    } catch (error) {
      console.error(error)
    }
  }

  const logout = async () => {
    try {
      if (!tokens.value || !tokens.value.refresh || !tokens.value.refresh.token) return
      await AuthService.logout(tokens.value.refresh.token)
      LocalStorage.remove('tokens')
      LocalStorage.remove('user')
      tokens.value = undefined
      user.value = undefined
    } catch (error) {
      console.error(error)
    }
  }

  const refreshTokens = async () => {
    try {
      if (!tokens.value || !tokens.value.refresh || !tokens.value.refresh.token) return
      const { data } = await AuthService.refreshTokens(tokens.value.refresh.token)
      tokens.value = data
    } catch (error) {
      console.error(error)
    }
  }

  const forgotPassword = async (email: string) => {
    try {
      await AuthService.forgotPassword(email)
    } catch (error) {
      console.error(error)
    }
  }

  const resetPassword = async (password: string, token: string) => {
    try {
      await AuthService.resetPassword(password, token)
    } catch (error) {
      console.error(error)
    }
  }

  const sendVerificationEmail = async () => {
    try {
      await AuthService.sendVerificationEmail()
    } catch (error) {
      console.error(error)
    }
  }

  const verifyEmail = async (token: string) => {
    try {
      await AuthService.verifyEmail(token)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    fetchLocalStorage,
    forgotPassword,
    login,
    logout,
    refreshTokens,
    register,
    resetPassword,
    sendVerificationEmail,
    tokens,
    user,
    verifyEmail
  }
})
