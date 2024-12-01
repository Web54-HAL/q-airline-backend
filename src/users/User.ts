import { UserRole } from './UserRole';

export interface User {
  id: number;
  password: string;
  role: UserRole;
}
