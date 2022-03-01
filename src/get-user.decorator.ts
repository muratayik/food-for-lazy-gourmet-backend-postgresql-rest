import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUserEmail = createParamDecorator(
  (_, ctx: ExecutionContext): string => {
    const req = ctx.switchToHttp().getResponse();
    return req.locals.userEmail;
  },
);
