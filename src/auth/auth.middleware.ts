import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      throw new UnauthorizedException();
    }

    const tokenWithourBearerText = bearerToken.replace('Bearer ', '');

    const baseUrl = this.configService.get('AUTH_API_BASE_URL');

    const url = `${baseUrl}/${tokenWithourBearerText}`;

    const { data } = await firstValueFrom(this.httpService.get(url));

    res.locals.user = data;

    next();
  }
}
