import { Document, Role, User } from 'types'

export interface TeamMember  extends Document {
  dateInvited: string | Date;
  dateJoined: string | Date | null;
  invite: boolean;
  role: Role;
  user: User;
}
