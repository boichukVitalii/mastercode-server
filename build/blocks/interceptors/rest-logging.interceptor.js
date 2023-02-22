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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestLoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const logger_1 = __importStar(require("../../logger"));
class RestLoggingInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const traceId = (0, logger_1.setTraceId)(request.header('X-Request-Id'));
        context.switchToHttp().getResponse().set('X-Request-Id', traceId);
        const params = {
            method: request.method,
            url: request.url,
            body: request.body,
        };
        logger_1.default.debug(params, `Request started`);
        const startedAt = process.hrtime.bigint();
        return next.handle().pipe((0, operators_1.catchError)((err) => {
            if (err instanceof common_1.HttpException) {
                const status = err.getStatus();
                const level = 500 <= status && status <= 599 ? 'error' : 'debug';
                logger_1.default[level]({ ...params, duration: this.fromStarted(startedAt), err }, `Request finished with error`);
                return (0, rxjs_1.throwError)(() => err);
            }
            logger_1.default.error({ ...params, duration: this.fromStarted(startedAt), err }, `Request finished with error`);
            return (0, rxjs_1.throwError)(() => err);
        }), (0, operators_1.tap)(() => {
            logger_1.default.debug({ ...params, duration: this.fromStarted(startedAt) }, `Request finished`);
        }));
    }
    fromStarted(startedAt) {
        return parseFloat((process.hrtime.bigint() - startedAt).toString()) / 10 ** 9;
    }
}
exports.RestLoggingInterceptor = RestLoggingInterceptor;
//# sourceMappingURL=rest-logging.interceptor.js.map