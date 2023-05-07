import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUserId = createParamDecorator(
	(_: string | undefined, ctx: ExecutionContext): string => {
		const request = ctx.switchToHttp().getRequest();
		return request.user['sub'];
	},
);
