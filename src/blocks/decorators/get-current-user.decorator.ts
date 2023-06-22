import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TJwtPayload } from 'src/auth/types';
import { User } from 'src/user/entities/user.entity';

export const GetCurrentUser = createParamDecorator(
	(data: string | undefined, ctx: ExecutionContext): TJwtPayload | any => {
		const request = ctx.switchToHttp().getRequest();
		if (!data) return request.user;
		return request.user[data];
	},
);
