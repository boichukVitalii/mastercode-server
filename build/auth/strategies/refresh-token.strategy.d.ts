import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { TJwtPayload } from '../types';
declare const RefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class RefreshTokenStrategy extends RefreshTokenStrategy_base {
    constructor();
    validate(req: Request, payload: TJwtPayload): object;
}
export {};
