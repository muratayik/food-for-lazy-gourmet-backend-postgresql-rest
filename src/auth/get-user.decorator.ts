import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (_, ctx: ExecutionContext): string => {
    const res = ctx.switchToHttp().getResponse();
    return res.locals.user;
  },
);
