import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FileModule } from '../file/file.module';
import { ProblemModule } from '../problem/problem.module';
import { UserSolvedProblem } from './entities/user-solved-problem.entity';

@Module({
	imports: [TypeOrmModule.forFeature([User, UserSolvedProblem]), FileModule, ProblemModule],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
