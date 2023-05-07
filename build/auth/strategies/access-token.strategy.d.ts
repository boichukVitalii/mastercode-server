import { Strategy } from 'passport-jwt';
import { TJwtPayload } from '../types';
declare const AccessTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class AccessTokenStrategy extends AccessTokenStrategy_base {
    constructor();
    validate(payload: TJwtPayload): TJwtPayload;
}
export {};
