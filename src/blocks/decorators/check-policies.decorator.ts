import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { IPolicyHandler } from 'src/casl/types/casl-types.type';

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (...handlers: IPolicyHandler[]): CustomDecorator<string> =>
	SetMetadata(CHECK_POLICIES_KEY, handlers);
