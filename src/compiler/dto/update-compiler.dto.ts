import { PartialType } from '@nestjs/mapped-types';
import { CreateCompilerDto } from './create-compiler.dto';

export class UpdateCompilerDto extends PartialType(CreateCompilerDto) {}
