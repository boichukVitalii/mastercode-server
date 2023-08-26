import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { hashPassword, validatePassword } from 'metautil';

@Injectable()
export class ScryptService implements HashingService {
	async hash(data: string): Promise<string> {
		return await hashPassword(data);
	}

	async compare(data: string, encrypted: string): Promise<boolean> {
		return await validatePassword(data, encrypted);
	}
}
