import { NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserRole } from './user-role.enum';

export class AdminCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const userData = res.locals.user;

    if (!userData) {
      throw new UnauthorizedException();
    }

    if (userData.role !== UserRole.ADMIN) {
      throw new UnauthorizedException();
    }

    next();
  }
}
