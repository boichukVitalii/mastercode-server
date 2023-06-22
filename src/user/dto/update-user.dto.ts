import { PartialType, OmitType } from '@nestjs/swagger';
import { SignupLocalDto } from 'src/auth/dto/signup-local.dto';

export class UpdateUserDto extends PartialType(SignupLocalDto) {
	refresh_token_hash?: string;
}
