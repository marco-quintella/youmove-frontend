export interface Status {
  id: string
  name: string
  color: string
  tasks: any[] // TODO: Tasks
}

export interface CreateStatusPayload {
  name: Status['name']
  color?: Status['color']
}
