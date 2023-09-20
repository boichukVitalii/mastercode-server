import { HttpStatus } from '@nestjs/common';

export type TFilterResponseBody = {
	statusCode: HttpStatus;
	message: string;
	additionalInfo: string;
	method: string;
	path: string;
	timestamp: string;
};
