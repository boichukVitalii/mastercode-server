"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const custom_errors_1 = require("../../errors/custom-errors");
const typeorm_1 = require("typeorm");
const filter_constants_1 = require("./filter.constants");
const ErrorsStatusCodes = new Map([
    [typeorm_1.QueryFailedError.name, common_1.HttpStatus.UNPROCESSABLE_ENTITY],
    [typeorm_1.EntityNotFoundError.name, common_1.HttpStatus.NOT_FOUND],
    [custom_errors_1.EntityNotFoundCustomError.name, common_1.HttpStatus.NOT_FOUND],
    [custom_errors_1.WrongCredentialsError.name, common_1.HttpStatus.UNAUTHORIZED],
    [custom_errors_1.ServerConflictError.name, common_1.HttpStatus.CONFLICT],
    [custom_errors_1.EmailNotConfirmedError.name, common_1.HttpStatus.UNAUTHORIZED],
    [custom_errors_1.InvalidTokenError.name, common_1.HttpStatus.BAD_REQUEST],
]);
let GlobalExceptionFilter = class GlobalExceptionFilter {
    constructor(httpAdapterHost, logger) {
        this.httpAdapterHost = httpAdapterHost;
        this.logger = logger;
    }
    catch(exception, host) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const httpStatus = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : exception instanceof Error
                ? ErrorsStatusCodes.get(exception.constructor.name) || common_1.HttpStatus.INTERNAL_SERVER_ERROR
                : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const message = exception instanceof Error
            ? exception.message || filter_constants_1.NO_INFO_ABOUT_ERROR_MSG
            : filter_constants_1.NO_INFO_ABOUT_ERROR_MSG;
        const additionalInfo = exception instanceof common_1.HttpException
            ? exception.getResponse()
            : exception instanceof typeorm_1.QueryFailedError
                ? exception.driverError.detail || filter_constants_1.NO_ADD_INFO_ABOUT_ERROR_MSG
                : filter_constants_1.NO_ADD_INFO_ABOUT_ERROR_MSG;
        this.logger.error(exception);
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
};
GlobalExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost, Object])
], GlobalExceptionFilter);
exports.GlobalExceptionFilter = GlobalExceptionFilter;
//# sourceMappingURL=global-exceptions.filter.js.map