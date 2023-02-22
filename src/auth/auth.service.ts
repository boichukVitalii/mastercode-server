import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
	signupLocal(@Body() createAuthDto: CreateAuthDto) {
		return this.authService.create(createAuthDto);
	}

	signinLocal(@Body() createAuthDto: CreateAuthDto) {
		return this.authService.create(createAuthDto);
	}

	logout(@Body() createAuthDto: CreateAuthDto) {
		return this.authService.create(createAuthDto);
	}

	refreshTokens(@Body() createAuthDto: CreateAuthDto) {
		return this.authService.create(createAuthDto);
	}
}
