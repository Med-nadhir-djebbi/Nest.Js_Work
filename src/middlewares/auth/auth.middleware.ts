import { Injectable, NestMiddleware , UnauthorizedException } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import type { Request, Response , NextFunction} from 'express';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['auth-user'] as string;
    if(!authHeader)
    {
      throw new UnauthorizedException('No token provided');
    }
    try {
      const decoded = verify(authHeader,'my-secret-code-of-length-256-bits') as any;
      if (!decoded || !decoded.userId) {
        throw new UnauthorizedException('Invalid token');
      }
      req['userId'] = decoded.userId;
      next();
    } 
    catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
