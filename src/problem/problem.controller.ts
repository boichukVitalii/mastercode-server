import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	NotFoundException,
	Query,
	HttpCode,
	HttpStatus,
	UseInterceptors,
	CacheTTL,
} from '@nestjs/common';
import { ProblemService } from './problem.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { PROBLEMS_NOT_FOUND_ERROR } from './problem.constants';
import { Problem } from './entities/problem.entity';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { PolicyHandler } from '../blocks/handlers/policy.handler';
import { CheckPolicies } from '../blocks/decorators/check-policies.decorator';
import { Action } from '../casl/types/casl-types.type';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from '../blocks/decorators/get-current-userId.decorator';
import { ToggleReactionDto } from './dto/toggle-reaction.dto';
import { ToggleReactionResponseDto } from './dto/toggle-reaction-response.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('problem')
@Controller('problem')
export class ProblemController {
	constructor(private readonly problemService: ProblemService) {}

	@Post()
	@CheckPolicies(new PolicyHandler(Action.Create, Problem))
	async create(@Body() dto: CreateProblemDto): Promise<Problem> {
		return await this.problemService.create(dto);
	}

	@UseInterceptors(CacheInterceptor)
	@CacheTTL(1000 * 60)
	@Get()
	@CheckPolicies(new PolicyHandler(Action.ReadMany, Problem))
	async findMany(@Query() query: PaginationQueryDto): Promise<Problem[]> {
		const problems = await this.problemService.findMany(query);
		if (!problems.length) throw new NotFoundException(PROBLEMS_NOT_FOUND_ERROR);
		return problems;
	}

	@Get(':id')
	@CheckPolicies(new PolicyHandler(Action.ReadOne, Problem))
	async findOne(@Param('id') id: string): Promise<Problem> {
		return await this.problemService.findOneOrThrow({ id });
	}

	@Patch(':id')
	@CheckPolicies(new PolicyHandler(Action.Update, Problem))
	async update(@Param('id') id: string, @Body() dto: UpdateProblemDto): Promise<Problem> {
		return await this.problemService.updateOne({ id }, dto);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	@CheckPolicies(new PolicyHandler(Action.Delete, Problem))
	async remove(@Param('id') id: string): Promise<void> {
		await this.problemService.remove({ id });
	}

	@Post('toggle-reaction')
	async toggleReaction(
		@Body() { problem_id, reaction_type }: ToggleReactionDto,
		@GetCurrentUserId() userId: string,
	): Promise<ToggleReactionResponseDto> {
		return await this.problemService.toggleReaction(problem_id, userId, reaction_type);
	}
}
