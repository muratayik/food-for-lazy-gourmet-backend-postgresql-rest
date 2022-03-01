import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly httpService: HttpService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      throw new UnauthorizedException();
    }

    const tokenWithourBearerText = bearerToken.replace('Bearer ', '');

    const url = `https://food-for-lazy-gourmet-auth.herokuapp.com/auth/${tokenWithourBearerText}`;

    const { data } = await firstValueFrom(this.httpService.get(url));

    const { email } = data;
    res.locals.userEmail = email;

    next();
  }
}
