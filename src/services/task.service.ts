import type { CreateTaskPayload, Task } from 'types'

export default class TaskService {
  static uri = '/tasks'

  static create = (task: CreateTaskPayload, statusId: string) => api.post<Task>(`${this.uri}/create/status/${statusId}`, task)
}
