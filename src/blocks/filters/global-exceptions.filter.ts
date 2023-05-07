import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpAdapterHost,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import {
	EmailNotConfirmedError,
	EntityNotFoundCustomError,
	InvalidTokenError,
	ServerConflictError,
	WrongCredentialsError,
} from 'src/errors/custom-errors';
import logger from 'src/logger';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { NO_ADD_INFO_ABOUT_ERROR_MSG, NO_INFO_ABOUT_ERROR_MSG } from './filter.constants';

const ErrorsStatusCodes = new Map<string, number>([
	[QueryFailedError.name, HttpStatus.UNPROCESSABLE_ENTITY],
	[EntityNotFoundError.name, HttpStatus.NOT_FOUND],
	[EntityNotFoundCustomError.name, HttpStatus.NOT_FOUND],
	[WrongCredentialsError.name, HttpStatus.UNAUTHORIZED],
	[ServerConflictError.name, HttpStatus.CONFLICT],
	[EmailNotConfirmedError.name, HttpStatus.UNAUTHORIZED],
	[InvalidTokenError.name, HttpStatus.BAD_REQUEST],
]);

const getErrorStatusCode = (name: string): number | undefined => ErrorsStatusCodes.get(name);

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
				? getErrorStatusCode(exception.constructor.name) || HttpStatus.INTERNAL_SERVER_ERROR
				: HttpStatus.INTERNAL_SERVER_ERROR;

		const message =
			exception instanceof Error
				? exception.message || NO_INFO_ABOUT_ERROR_MSG
				: NO_INFO_ABOUT_ERROR_MSG;

		const additionalInfo =
			exception instanceof HttpException
				? exception.getResponse()
				: exception instanceof QueryFailedError
				? exception.driverError.detail || NO_ADD_INFO_ABOUT_ERROR_MSG
				: NO_ADD_INFO_ABOUT_ERROR_MSG;

		logger.error(exception);

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
