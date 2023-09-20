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
} from '../../errors/custom-errors';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { Logger, Level } from 'pino';
import { NO_ADD_INFO_ABOUT_ERROR_MSG, NO_INFO_ABOUT_ERROR_MSG } from './filter.constants';
import { TFilterResponseBody } from './filter.type';

const ErrorsStatusCodes = new Map<string, number>([
	[QueryFailedError.name, HttpStatus.UNPROCESSABLE_ENTITY],
	[EntityNotFoundError.name, HttpStatus.NOT_FOUND],
	[EntityNotFoundCustomError.name, HttpStatus.NOT_FOUND],
	[WrongCredentialsError.name, HttpStatus.UNAUTHORIZED],
	[ServerConflictError.name, HttpStatus.CONFLICT],
	[EmailNotConfirmedError.name, HttpStatus.UNAUTHORIZED],
	[InvalidTokenError.name, HttpStatus.BAD_REQUEST],
]);

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	constructor(
		private readonly httpAdapterHost: HttpAdapterHost,
		public readonly logger: Pick<Logger, Level>,
	) {}

	catch(exception: unknown, host: ArgumentsHost): void {
		const { httpAdapter } = this.httpAdapterHost;
		const ctx = host.switchToHttp();

		const httpStatus =
			exception instanceof HttpException
				? exception.getStatus()
				: exception instanceof Error
				? ErrorsStatusCodes.get(exception.constructor.name) || HttpStatus.INTERNAL_SERVER_ERROR
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

		this.logger.error(exception);

		const request = ctx.getRequest();
		const responseBody: TFilterResponseBody = {
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
