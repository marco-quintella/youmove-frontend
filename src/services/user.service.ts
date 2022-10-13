import { api } from 'src/boot/axios'
import type { GetUsersQuery, GetUsersResponse, User } from 'src/types/user'

export default class UserService {
  static uri = '/users'

  static createUser = (user: User) => api.post<User>(this.uri, user)
  static getUsers = (query: GetUsersQuery) => api.get<GetUsersResponse>(this.uri, { params: query })
  static getUserById = (id: string) => api.get<User>(`${this.uri}/${id}`)
  static updateUserById = (id: string, body: User) => api.patch<User>(`${this.uri}/${id}`, body)
  static deleteUserById = (id: string) => api.delete<void>(`${this.uri}/${id}`)
}
