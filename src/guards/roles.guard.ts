import { ROLES, ROLES_KEY } from '@decorators';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<ROLES[]>(ROLES_KEY, context.getHandler());

    const request = context
      .switchToHttp()
      .getRequest<Request & { user: any }>();

    if (!roles.includes(request.user?.role)) {
      return false;
    }
    return true;
  }
}
