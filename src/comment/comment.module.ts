import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { ProblemModule } from 'src/problem/problem.module';
import { CaslModule } from 'src/casl/casl.module';

@Module({
	imports: [TypeOrmModule.forFeature([Comment]), ProblemModule, CaslModule],
	controllers: [CommentController],
	providers: [CommentService],
})
export class CommentModule {}
