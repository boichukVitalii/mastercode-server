import { PartialType } from '@nestjs/swagger';
import { SignupLocalDto } from '../../auth/dto/signup-local.dto';

export class UpdateUserDto extends PartialType(SignupLocalDto) {
	refresh_token_hash?: string;
}
