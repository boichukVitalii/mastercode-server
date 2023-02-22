import { AsyncLocalStorage } from 'async_hooks';
import { randomBytes } from 'crypto';

import { Logger as TypeOrmLogger, QueryRunner } from 'typeorm';
import { LoggerService as LoggerServiceInterface } from '@nestjs/common';
import Pino, { Logger, destination, Level, LoggerOptions } from 'pino';
import { PrettyOptions } from 'pino-pretty';

import config from './config';

const asyncLocalStorage = new AsyncLocalStorage<string>();

export function setTraceId(requestId?: string): string {
	const traceId = requestId || randomBytes(16).toString('hex');
	asyncLocalStorage.enterWith(traceId);
	return traceId;
}

const prettyConfig: PrettyOptions = {
	colorize: true,
	levelFirst: true,
	ignore: 'serviceContext',
	translateTime: 'SYS:HH:MM:ss.l',
};

const options: LoggerOptions = {
	level: config.logLevel,
	base: {
		serviceContext: {
			service: config.applicationName,
			version: config.version,
		},
	},
	redact: {
		paths: ['pid', 'hostname', 'body.password'],
		remove: true,
	},
	transport: process.env.PRETTY_LOGGING
		? {
				target: 'pino-pretty',
				options: prettyConfig,
		  }
		: undefined,
};

const stdout = Pino(options);
const stderr = Pino(options, destination(2));

const logger: Pick<Logger, Level> = {
	trace: stdout.trace.bind(stdout),
	debug: stdout.debug.bind(stdout),
	info: stdout.info.bind(stdout),
	warn: stdout.warn.bind(stdout),
	error: stderr.error.bind(stderr),
	fatal: stderr.fatal.bind(stderr),
};

export default logger;

export class LoggerService implements LoggerServiceInterface {
	error(message: unknown, trace?: string, context?: string): void {
		logger.error({
			err: {
				message,
				stack: trace,
				context,
			},
		});
	}

	warn(message: string): void {
		logger.warn(message);
	}

	log(message: string): void {
		logger.info(message);
	}

	debug(message: string): void {
		logger.debug(message);
	}

	verbose(message: string): void {
		logger.trace(message);
	}
}

class QueryLogger implements TypeOrmLogger {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	logQuery(query: string, params?: unknown[], queryRunner?: QueryRunner): void {
		if (query === 'SELECT 1') return;
		logger.debug({ query, params }, 'New DB query');
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	logQueryError(error: string, query: string, params?: unknown[], queryRunner?: QueryRunner): void {
		logger.warn({ query, params }, 'Errored DB query');
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	logQuerySlow(time: number, query: string, params?: unknown[], queryRunn?: QueryRunner): void {
		logger.warn({ query, params, time }, 'Slow DB query');
	}

	logSchemaBuild(message: string, queryRunner?: QueryRunner): void {
		logger.trace(message, queryRunner);
	}

	logMigration(message: string, queryRunner?: QueryRunner): void {
		logger.info(message, queryRunner);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	log(level: 'log' | 'info' | 'warn', message: unknown, queryRunner?: QueryRunner): void {
		switch (level) {
			case 'log':
			case 'info':
				logger.trace({ message }, 'DB log');
				break;
			case 'warn':
				logger.warn({ message }, 'DB warn');
				break;
		}
	}
}

export const queryLogger = new QueryLogger();
