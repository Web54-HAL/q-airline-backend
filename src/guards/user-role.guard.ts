import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  SignedInUserDto,
  signedInUserPayloadKey,
} from 'src/auth/dto/signed-in-user.dto';
import { ROLE_KEY } from 'src/decorators/EndpointUserRole';
import { UserRole } from 'src/enums/UserRole';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<UserRole[]>(
      ROLE_KEY,
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const token: SignedInUserDto = request[signedInUserPayloadKey];

    for (const role of requiredRoles) {
      const result = UserRole[role] === token.role;

      if (result) return true;
    }

    throw new UnauthorizedException();
  }
}
