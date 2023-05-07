import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class EmailConfirmationGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const isPublic = this.reflector.getAllAndOverride('isPublic', [
			context.getHandler(),
			context.getClass(),
		]);
		if (isPublic) return true;
		const request = context.switchToHttp().getRequest();
		if (!request.user?.isEmailConfirmed) {
			throw new UnauthorizedException('Please confirm your email address');
		}
		return true;
	}
}
