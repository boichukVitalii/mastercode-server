import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './blocks/filters/global-exceptions.filter';
import { RestLoggingInterceptor } from './blocks/interceptors/rest-logging.interceptor';
import config from './config';
import { AppModule } from './app.module';
import { LoggerService } from './logger';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule, {
		logger: new LoggerService(),
	});
	app.setGlobalPrefix('api');
	app.enableCors();
	app.useGlobalInterceptors(new RestLoggingInterceptor());
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			forbidNonWhitelisted: true,
			stopAtFirstError: true,
		}),
	);

	const httpAdapter = app.get(HttpAdapterHost);
	app.useGlobalFilters(new GlobalExceptionFilter(httpAdapter));

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
