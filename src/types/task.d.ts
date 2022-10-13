import type { Document, TeamMember } from 'types'

export interface Task extends Document {
  creator: TeamMember;
  members: TeamMember[];
  priority: string; // Priority
  tags: string[]; // Tags
  waiting: Task[];
  subtasks: Task[];
  title: string;
  description: string | null;
  history: string[];
  checkList: string[];
  attachments: string[];
  expiringDate: string | Date;
  watching: TeamMember[];
}


export interface CreateTaskPayload {
  title: Task['title'];
  members?: string[];
}
