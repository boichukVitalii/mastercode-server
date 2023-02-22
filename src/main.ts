import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './blocks/filters/global-exceptions.filter';
import { RestLoggingInterceptor } from './blocks/interceptors/rest-logging.interceptor';
import config from './config';
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

	app.enableShutdownHooks();
	await app.listen(config.http.port);
}
bootstrap();
