"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryLogger = exports.LoggerService = exports.setTraceId = void 0;
const node_async_hooks_1 = require("node:async_hooks");
const node_crypto_1 = require("node:crypto");
const pino_1 = __importStar(require("pino"));
const config_1 = __importDefault(require("./config"));
const asyncLocalStorage = new node_async_hooks_1.AsyncLocalStorage();
function setTraceId(requestId) {
    const traceId = requestId || (0, node_crypto_1.randomBytes)(16).toString('hex');
    asyncLocalStorage.enterWith(traceId);
    return traceId;
}
exports.setTraceId = setTraceId;
const prettyConfig = {
    colorize: true,
    levelFirst: true,
    ignore: 'serviceContext',
    translateTime: 'SYS:HH:MM:ss.l',
};
const options = {
    level: config_1.default.logLevel,
    base: {
        serviceContext: {
            service: config_1.default.applicationName,
            version: config_1.default.version,
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
const stdout = (0, pino_1.default)(options);
const stderr = (0, pino_1.default)(options, (0, pino_1.destination)(2));
const logger = {
    trace: stdout.trace.bind(stdout),
    debug: stdout.debug.bind(stdout),
    info: stdout.info.bind(stdout),
    warn: stdout.warn.bind(stdout),
    error: stderr.error.bind(stderr),
    fatal: stderr.fatal.bind(stderr),
};
exports.default = logger;
class LoggerService {
    error(message, trace, context) {
        logger.error({
            err: {
                message,
                stack: trace,
                context,
            },
        });
    }
    warn(message) {
        logger.warn(message);
    }
    log(message) {
        logger.info(message);
    }
    debug(message) {
        logger.debug(message);
    }
    verbose(message) {
        logger.trace(message);
    }
}
exports.LoggerService = LoggerService;
class QueryLogger {
    logQuery(query, params, queryRunner) {
        if (query === 'SELECT 1')
            return;
        logger.debug({ query, params }, 'New DB query');
    }
    logQueryError(error, query, params, queryRunner) {
        logger.warn({ query, params }, 'Errored DB query');
    }
    logQuerySlow(time, query, params, queryRunn) {
        logger.warn({ query, params, time }, 'Slow DB query');
    }
    logSchemaBuild(message, queryRunner) {
        logger.trace(message, queryRunner);
    }
    logMigration(message, queryRunner) {
        logger.info(message, queryRunner);
    }
    log(level, message, queryRunner) {
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
exports.queryLogger = new QueryLogger();
//# sourceMappingURL=logger.js.map