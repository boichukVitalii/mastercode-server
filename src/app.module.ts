import { Module } from '@nestjs/common';
import { ProblemModule } from './problem/problem.module';
import { CompilerModule } from './compiler/compiler.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { queryLogger } from './logger';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './blocks/guards/access-token.guard';
import { EmailModule } from './email/email.module';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
import { CaslModule } from './casl/casl.module';
import { FileModule } from './file/file.module';
import { PoliciesGuard } from './blocks/guards/policies.guard';
import { EmailConfirmationGuard } from './blocks/guards/email-confirmation.guard';
import { CacheModule } from '@nestjs/cache-manager';
import { HealthModule } from './health/health.module';
import * as redisStore from 'cache-manager-redis-store';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			...config.dbConfig,
			// logger: queryLogger,
		}),
		CacheModule.register<any>({
			isGlobal: true,
			store: redisStore,
			socket: config.redisCacheConfig,
			ttl: 5000,
		}),
		ProblemModule,
		CompilerModule,
		UserModule,
		CategoryModule,
		CommentModule,
		AuthModule,
		EmailModule,
		EmailConfirmationModule,
		CaslModule,
		FileModule,
		HealthModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AccessTokenGuard,
		},
		{
			provide: APP_GUARD,
			useClass: EmailConfirmationGuard,
		},
		{
			provide: APP_GUARD,
			useClass: PoliciesGuard,
		},
	],
	controllers: [],
})
export class AppModule {}
