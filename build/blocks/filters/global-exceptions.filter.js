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
const typeorm_1 = require("typeorm");
const NO_INFO_ABOUT_ERROR_MSG = 'No info about the error';
const NO_ADD_INFO_ABOUT_ERROR_MSG = 'No additional info about the error';
const TypeOrmExceptionsStatusCodes = new Map([
    [typeorm_1.QueryFailedError.name, common_1.HttpStatus.UNPROCESSABLE_ENTITY],
    [typeorm_1.EntityNotFoundError.name, common_1.HttpStatus.UNPROCESSABLE_ENTITY],
]);
const getExceptionStatusCode = (name) => TypeOrmExceptionsStatusCodes.get(name);
let GlobalExceptionFilter = class GlobalExceptionFilter {
    constructor(httpAdapterHost) {
        this.httpAdapterHost = httpAdapterHost;
    }
    catch(exception, host) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const httpStatus = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : exception instanceof Error
                ? getExceptionStatusCode(exception.constructor.name) || common_1.HttpStatus.INTERNAL_SERVER_ERROR
                : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const message = exception instanceof Error
            ? exception.message.split('"')[0] || NO_INFO_ABOUT_ERROR_MSG
            : NO_INFO_ABOUT_ERROR_MSG;
        const additionalInfo = exception instanceof common_1.HttpException
            ? exception.getResponse()
            : exception instanceof typeorm_1.QueryFailedError
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
};
GlobalExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [Object])
], GlobalExceptionFilter);
exports.GlobalExceptionFilter = GlobalExceptionFilter;
//# sourceMappingURL=global-exceptions.filter.js.map