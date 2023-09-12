import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { ProblemModule } from '../problem/problem.module';
import { CaslModule } from '../casl/casl.module';
import { UserModule } from '../user/user.module';

@Module({
	imports: [TypeOrmModule.forFeature([Comment]), ProblemModule, CaslModule, UserModule],
	controllers: [CommentController],
	providers: [CommentService],
})
export class CommentModule {}
