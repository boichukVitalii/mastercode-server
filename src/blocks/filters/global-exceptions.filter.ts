import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpAdapterHost,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

const NO_INFO_ABOUT_ERROR_MSG = 'No info about the error';
const NO_ADD_INFO_ABOUT_ERROR_MSG = 'No additional info about the error';

// interface IDBErorr extends TypeORMError {
// 	code: string;
// 	detail: string;
// }

const TypeOrmExceptionsStatusCodes = new Map<string, number>([
	[QueryFailedError.name, HttpStatus.UNPROCESSABLE_ENTITY],
	[EntityNotFoundError.name, HttpStatus.UNPROCESSABLE_ENTITY],
]);

const getExceptionStatusCode = (name: string): number | undefined =>
	TypeOrmExceptionsStatusCodes.get(name);

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

	catch(exception: unknown, host: ArgumentsHost): void {
		const { httpAdapter } = this.httpAdapterHost;
		const ctx = host.switchToHttp();

		const httpStatus =
			exception instanceof HttpException
				? exception.getStatus()
				: exception instanceof Error
				? getExceptionStatusCode(exception.constructor.name) || HttpStatus.INTERNAL_SERVER_ERROR
				: HttpStatus.INTERNAL_SERVER_ERROR;

		const message =
			exception instanceof Error
				? exception.message.split('"')[0] || NO_INFO_ABOUT_ERROR_MSG
				: NO_INFO_ABOUT_ERROR_MSG;

		const additionalInfo =
			exception instanceof HttpException
				? exception.getResponse()
				: exception instanceof QueryFailedError
				? exception.driverError.detail || NO_ADD_INFO_ABOUT_ERROR_MSG
				: NO_ADD_INFO_ABOUT_ERROR_MSG;

		const request = ctx.getRequest();
		const responseBody = {
			statusCode: httpStatus,
			message,
			additionalInfo,
			method: request.method,
			path: httpAdapter.getRequestUrl(request),
			timestamp: new Date().toISOString(),
		};

		httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
	}
}
