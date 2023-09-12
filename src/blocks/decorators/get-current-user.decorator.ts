import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TJwtPayload } from '../../auth/types';

export const GetCurrentUser = createParamDecorator(
	(data: string | undefined, ctx: ExecutionContext): TJwtPayload | any => {
		const request = ctx.switchToHttp().getRequest();
		if (!data) return request.user;
		return request.user[data];
	},
);
