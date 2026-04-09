import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['auth-user'];
    if (!authHeader || typeof authHeader !== 'string') {
      throw new UnauthorizedException('Token missing');
    }
    try {
      const decoded = jwt.verify(authHeader, 'super-secret-key') as any;
      (request as any).user = { userId: decoded.sub, username: decoded.username, role: decoded.role };
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}