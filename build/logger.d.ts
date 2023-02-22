import { Logger as TypeOrmLogger, QueryRunner } from 'typeorm';
import { LoggerService as LoggerServiceInterface } from '@nestjs/common';
import { Logger, Level } from 'pino';
export declare function setTraceId(requestId?: string): string;
declare const logger: Pick<Logger, Level>;
export default logger;
export declare class LoggerService implements LoggerServiceInterface {
    error(message: unknown, trace?: string, context?: string): void;
    warn(message: string): void;
    log(message: string): void;
    debug(message: string): void;
    verbose(message: string): void;
}
declare class QueryLogger implements TypeOrmLogger {
    logQuery(query: string, params?: unknown[], queryRunner?: QueryRunner): void;
    logQueryError(error: string, query: string, params?: unknown[], queryRunner?: QueryRunner): void;
    logQuerySlow(time: number, query: string, params?: unknown[], queryRunn?: QueryRunner): void;
    logSchemaBuild(message: string, queryRunner?: QueryRunner): void;
    logMigration(message: string, queryRunner?: QueryRunner): void;
    log(level: 'log' | 'info' | 'warn', message: unknown, queryRunner?: QueryRunner): void;
}
export declare const queryLogger: QueryLogger;
