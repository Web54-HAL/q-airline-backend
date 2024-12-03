import { UserRole } from 'src/enums/UserRole';

export interface User {
  id: number;
  password: string;
  role: UserRole;
}
