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

@Module({
	imports: [
		TypeOrmModule.forRoot({
			...config.dbConfig,
			logger: queryLogger,
			// autoLoadEntities: true,
		}),
		ProblemModule,
		CompilerModule,
		UserModule,
		CategoryModule,
		CommentModule,
		AuthModule,
	],
})
export class AppModule {}
