"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const global_exceptions_filter_1 = require("./blocks/filters/global-exceptions.filter");
const rest_logging_interceptor_1 = require("./blocks/interceptors/rest-logging.interceptor");
const config_1 = __importDefault(require("./config"));
const logger_1 = require("./logger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: new logger_1.LoggerService(),
    });
    app.setGlobalPrefix('api');
    app.enableCors();
    app.useGlobalInterceptors(new rest_logging_interceptor_1.RestLoggingInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        stopAtFirstError: true,
    }));
    const httpAdapter = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new global_exceptions_filter_1.GlobalExceptionFilter(httpAdapter));
    app.enableShutdownHooks();
    await app.listen(config_1.default.http.port);
}
bootstrap();
//# sourceMappingURL=main.js.map