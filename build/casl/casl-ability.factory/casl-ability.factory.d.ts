import { TJwtPayload } from '../../auth/types';
import { AppAbility } from '../types/casl-types.type';
export declare class CaslAbilityFactory {
    createForUser(user: TJwtPayload, paramsId?: string): AppAbility;
}
