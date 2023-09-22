import { Module } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { ProblemController } from './problem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem } from './entities/problem.entity';
import { ProblemReaction } from './entities/problem-reaction.entity';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import config from '../config';

@Module({
	imports: [
		TypeOrmModule.forFeature([Problem, ProblemReaction]),
		CacheModule.register<any>({
			useFactory: async () => ({
				store: redisStore,
				socket: config.redisCacheConfig,
				// ttl: 1000,
			}),
		}),
	],
	controllers: [ProblemController],
	providers: [ProblemService],
	exports: [ProblemService],
})
export class ProblemModule {}
