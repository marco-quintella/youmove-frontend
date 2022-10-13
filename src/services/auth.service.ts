import type { User } from 'src/types/user'
import type { AuthTokens, LoginBody, LoginResponse, RegisterBody, RegisterResponse } from 'src/types/auth.d'
import { api } from 'src/boot/axios'

export default class AuthService {
  static uri = '/auth'

  static register = (user: RegisterBody) => api.post<RegisterResponse>(`${this.uri}/register`, user)
  static login = (user: LoginBody) => api.post<LoginResponse>(`${this.uri}/login`, user)
  static logout = (refreshToken: string) => api.post<void>(`${this.uri}/logout`, { refreshToken })
  static refreshTokens = (refreshToken: string) => api.post<AuthTokens>(`${this.uri}/refresh-tokens`, { refreshToken })
  static forgotPassword = (email: string) => api.post<void>(`${this.uri}/forgot-password`, { email })
  static resetPassword = (password: string, token: string) => api.post<void>(`${this.uri}/reset-password`, { password }, { params: { token } })
  static sendVerificationEmail = () => api.post<void>(`${this.uri}/send-verification-email`)
  static verifyEmail = (token: string) => api.post<void>(`${this.uri}/verify-email`, {}, { params: { token } })
  static getUserByToken = (token: string) => api.post<User>(`${this.uri}/get-user-by-token`, { token })
}
