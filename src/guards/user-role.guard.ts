import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from 'src/decorators/EndpointUserRole';
import { UserRole } from 'src/enums/UserRole';

export class TokenDto {
  id: number;
  role: string;
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<UserRole[]>(
      ROLE_KEY,
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const token = request['user'] as TokenDto;

    for (const role of requiredRoles) {
      const result = UserRole[role] === token.role;

      if (result) return true;
    }

    throw new UnauthorizedException();
  }
}
