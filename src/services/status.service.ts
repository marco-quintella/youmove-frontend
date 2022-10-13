import type { CreateStatusPayload, PaginatedResponse, Status } from '../types'

export default class StatusService {
  static uri = '/status'

  static getByCategoryId = async (id: string) => {
    const { data } = await api.get<PaginatedResponse<Status>>(`${this.uri}/get/category/${id}`)
    return data
  }

  static create = async (categoryId: string, status: CreateStatusPayload) => {
    const { data } = await api.post<Status>(`${this.uri}/create/category/${categoryId}`, { ...status })
    return data
  }

  static updateById = async (statusId: string, status: Partial<Status>) => {
    const { data } = await api.patch<Status>(`${this.uri}/update/${statusId}`, { ...status })
    return data
  }
}
