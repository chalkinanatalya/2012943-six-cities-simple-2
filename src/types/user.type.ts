import { UserStatus } from './user-status.enum.js';

export type User = {
  name: string;
  email: string;
  avatar: string;
  status: UserStatus;
}
