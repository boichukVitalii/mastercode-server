import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { hash, compare } from 'bcrypt';

@Injectable()
export class BcryptService implements HashingService {
	async hash(data: string): Promise<string> {
		const saltRounds = 10;
		return await hash(data, saltRounds);
	}

	async compare(data: string, encrypted: string): Promise<boolean> {
		return await compare(data, encrypted);
	}
}
