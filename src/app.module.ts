import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ProblemsModule } from './problems/problems.module';
import { CompilerModule } from './compiler/compiler.module';

@Module({
	imports: [ConfigModule.forRoot(), PrismaModule, ProblemsModule, CompilerModule],
})
export class AppModule {}
