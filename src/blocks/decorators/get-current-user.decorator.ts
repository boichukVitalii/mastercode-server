import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

export const GetCurrentUser = createParamDecorator(
	(data: string | undefined, ctx: ExecutionContext): User | any => {
		const request = ctx.switchToHttp().getRequest();
		if (!data) return request.user;
		return request.user[data];
	},
);
