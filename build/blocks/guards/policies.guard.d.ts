import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
export declare class PoliciesGuard implements CanActivate {
    private reflector;
    private caslAbilityFactory;
    constructor(reflector: Reflector, caslAbilityFactory: CaslAbilityFactory);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
