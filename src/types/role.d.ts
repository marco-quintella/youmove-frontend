import { Document, Team } from 'types'

export interface Role extends Document {
  name: string;
  team: Team;
}
