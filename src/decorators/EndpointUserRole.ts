import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/enums/UserRole';

export const ROLE_KEY = 'userRole';

export const EndpointUserRole = (...roles: UserRole[]) =>
  SetMetadata(ROLE_KEY, roles);
