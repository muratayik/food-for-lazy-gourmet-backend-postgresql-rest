import { HttpService } from '@nestjs/axios';
import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
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

    try {
      const tokenWithourBearerText = bearerToken.replace('Bearer ', '');

      const baseUrl = this.configService.get('AUTH_API_BASE_URL');

      const url = `${baseUrl}/${tokenWithourBearerText}`;

      const { data } = await firstValueFrom(this.httpService.get(url));

      res.locals.user = data;

      next();
    } catch (error) {
      if (error?.response?.status === HttpStatus.UNAUTHORIZED) {
        throw new UnauthorizedException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
