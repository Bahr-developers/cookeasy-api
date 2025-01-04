import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private readonly reflector: Reflector,
      private readonly jwtService: JwtService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const isProtected = this.reflector.get<boolean>(
        'isProtected',
        context.getHandler(),
      );
  
      if (!isProtected) {
        return true;
      }
  
      const request = context.switchToHttp().getRequest<Request & {user: any}>();
      const token = this.extractToken(request);
  
      if (!token) {
        throw new UnauthorizedException('Token is missing');
      }
  
      try {
        const user = this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET,
        });
        request.user = user; 
        return true;
      } catch (error) {
        throw new UnauthorizedException('Invalid or expired token');
      }
    }
  
    private extractToken(request: Request): string | null {
      return request.cookies?.['access_token'] || null;
    }
  }
  