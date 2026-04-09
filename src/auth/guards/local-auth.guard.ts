import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../user/user.service';
@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private userService: UserService) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { username, password } = request.body;
    const user = await this.userService.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    (request as any).user = { userId: user.id, username: user.username, role: user.role };
    return true;
  }
}