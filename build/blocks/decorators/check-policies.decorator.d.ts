import { CustomDecorator } from '@nestjs/common';
import { IPolicyHandler } from '../../casl/types/casl-types.type';
export declare const CHECK_POLICIES_KEY = "check_policy";
export declare const CheckPolicies: (...handlers: IPolicyHandler[]) => CustomDecorator<string>;
