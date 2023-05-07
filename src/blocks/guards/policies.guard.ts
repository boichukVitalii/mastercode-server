import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { TJwtPayload } from 'src/auth/types';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { IPolicyHandler } from 'src/casl/types/casl-types.type';
import { CHECK_POLICIES_KEY } from '../decorators/check-policies.decorator';

@Injectable()
export class PoliciesGuard implements CanActivate {
	constructor(private reflector: Reflector, private caslAbilityFactory: CaslAbilityFactory) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride('isPublic', [
			context.getHandler(),
			context.getClass(),
		]);
		if (isPublic) return true;

		const policyHandlers =
			this.reflector.get<IPolicyHandler[]>(CHECK_POLICIES_KEY, context.getHandler()) || [];

		const request = context.switchToHttp().getRequest<Request>();
		const user = request.user as TJwtPayload;
		const id: string | undefined = request.params.id;
		const ability = this.caslAbilityFactory.createForUser(user);

		for (const handler of policyHandlers) {
			const result = await handler.handle(ability, id);
			if (!result) return false;
		}

		return true;
	}
}
