import { User } from 'src/types/user'

export interface Token {
  token: string
  expires: string
}

export interface AuthTokens {
  access?: Token
  refresh?: Token
}

export interface RegisterBody {
  email: string
  password: string
  name: string
}

export interface RegisterResponse {
  user: User
  tokens: AuthTokens
}

export interface LoginBody {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  tokens: AuthTokens
}
