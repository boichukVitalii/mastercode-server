import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './blocks/filters/global-exceptions.filter';
import { RestLoggingInterceptor } from './blocks/interceptors/rest-logging.interceptor';
import config from './config';
import { AppModule } from './app.module';
import logger, { LoggerService } from './logger';
import { validationPipeOptions } from './common/config-options/config-options';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule, {
		logger: new LoggerService(),
	});
	app.setGlobalPrefix('api');
	app.enableCors();
	app.useGlobalInterceptors(new RestLoggingInterceptor());
	app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

	const httpAdapter = app.get(HttpAdapterHost);
	app.useGlobalFilters(new GlobalExceptionFilter(httpAdapter, logger));

	const options = new DocumentBuilder()
		.addBearerAuth()
		.addSecurityRequirements('bearer')
		.setTitle('Mastercode')
		.setDescription('Mastercode application')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('docs', app, document);

	app.enableShutdownHooks();
	await app.listen(config.http.port);
}

bootstrap();
