import { ArgumentsHost, ExceptionFilter, HttpAdapterHost } from '@nestjs/common';
import { Logger, Level } from 'pino';
export declare class GlobalExceptionFilter implements ExceptionFilter {
    private readonly httpAdapterHost;
    readonly logger: Pick<Logger, Level>;
    constructor(httpAdapterHost: HttpAdapterHost, logger: Pick<Logger, Level>);
    catch(exception: unknown, host: ArgumentsHost): void;
}
