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
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const global_exceptions_filter_1 = require("./blocks/filters/global-exceptions.filter");
const rest_logging_interceptor_1 = require("./blocks/interceptors/rest-logging.interceptor");
const config_1 = __importDefault(require("./config"));
const app_module_1 = require("./app.module");
const logger_1 = __importStar(require("./logger"));
const config_options_1 = require("./common/config-options/config-options");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: new logger_1.LoggerService(),
    });
    app.setGlobalPrefix('api');
    app.enableCors();
    app.useGlobalInterceptors(new rest_logging_interceptor_1.RestLoggingInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe(config_options_1.validationPipeOptions));
    const httpAdapter = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new global_exceptions_filter_1.GlobalExceptionFilter(httpAdapter, logger_1.default));
    const options = new swagger_1.DocumentBuilder()
        .addBearerAuth()
        .addSecurityRequirements('bearer')
        .setTitle('Mastercode')
        .setDescription('Mastercode application')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('docs', app, document);
    app.enableShutdownHooks();
    await app.listen(config_1.default.http.port);
}
bootstrap();
//# sourceMappingURL=main.js.map