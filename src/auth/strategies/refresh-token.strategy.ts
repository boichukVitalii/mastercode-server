import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import config from '../../config';
import { TJwtPayload } from '../types';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.refreshSecret,
			passReqToCallback: true,
		});
	}

	validate(req: Request, payload: TJwtPayload): object {
		const refreshToken = req.get('authorization')?.replace('Bearer', '').trim();
		return {
			...payload,
			refreshToken,
		};
	}
}
