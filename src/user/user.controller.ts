import {
	Controller,
	Get,
	Body,
	Patch,
	Param,
	Delete,
	Query,
	NotFoundException,
	ClassSerializerInterceptor,
	UseInterceptors,
	HttpCode,
	HttpStatus,
	UploadedFile,
	Post,
	Res,
	StreamableFile,
	ParseFilePipeBuilder,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {
	AVATAR_NOT_FOUND_ERROR,
	USERS_NOT_FOUND_ERROR,
	USER_NOT_FOUND_ERROR,
} from './user.constants';
import { UserQueryDto } from './dto/user-query.dto';
import { AuthResponseDto } from '../auth/dto/auth-response.dto';
import { Action } from '../casl/types/casl-types.type';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetCurrentUserId } from '../blocks/decorators/get-current-userId.decorator';
import { Response } from 'express';
import { CheckPolicies } from '../blocks/decorators/check-policies.decorator';
import { PolicyHandler } from '../blocks/handlers/policy.handler';
import { AvatarResponseDto } from './dto/avatar-response.dto';
import { UserSolvedProblem } from './entities/user-solved-problem.entity';
import { UserStatisticsDto } from './dto/user-statistics.dto';
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiConsumes,
	ApiForbiddenResponse,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { createReadStream } from 'node:fs';

@ApiTags('user')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@CheckPolicies(new PolicyHandler(Action.ReadMany, User))
	async findMany(@Query() query: UserQueryDto): Promise<AuthResponseDto[]> {
		const users = await this.userService.findMany(query);
		if (!users.length) throw new NotFoundException(USERS_NOT_FOUND_ERROR);
		return users.map((user: User) => new AuthResponseDto(user));
	}

	@Patch(':id')
	@CheckPolicies(new PolicyHandler(Action.Update, User))
	async update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<AuthResponseDto> {
		const user = await this.userService.updateOne({ id }, dto);
		if (!user) throw new NotFoundException(USER_NOT_FOUND_ERROR);
		return new AuthResponseDto(user);
	}

	@Delete(':id')
	@CheckPolicies(new PolicyHandler(Action.Delete, User))
	@HttpCode(HttpStatus.NO_CONTENT)
	async remove(@Param('id') id: string): Promise<void> {
		const user = await this.userService.remove({ id });
		if (!user) throw new NotFoundException(USER_NOT_FOUND_ERROR);
	}

	@Post('avatar')
	@HttpCode(HttpStatus.OK)
	@UseInterceptors(FileInterceptor('file'))
	@ApiConsumes('multipart/form-data')
	@ApiBody({ description: `User's profile picture` })
	@ApiBadRequestResponse()
	@ApiUnauthorizedResponse()
	@ApiForbiddenResponse()
	async uploadAvatar(
		@UploadedFile(
			new ParseFilePipeBuilder()
				.addMaxSizeValidator({ maxSize: Math.pow(1024, 2) * 5 }) // 5mb
				.addFileTypeValidator({ fileType: /png|jpeg|jpg|webp/ })
				.build({
					errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
				}),
		)
		file: Express.Multer.File,
		@GetCurrentUserId() id: string,
	): Promise<AvatarResponseDto> {
		const avatar = await this.userService.uploadAvatar(file, id);
		return new AvatarResponseDto(avatar);
	}

	@Get(':id/avatar')
	async getUserAvatar(
		@Param('id') id: string,
		@Res({ passthrough: true }) res: Response,
	): Promise<StreamableFile> {
		const avatar = await this.userService.getUserAvatar(id);
		if (!avatar) throw new NotFoundException(AVATAR_NOT_FOUND_ERROR);
		const stream = createReadStream(avatar.path);
		res.set({ 'Content-Type': avatar.mimetype });
		return new StreamableFile(stream).setErrorHandler((err, handlerRes) => {
			if ((err as any).code === 'ENOENT') {
				res.set({ 'Content-Type': 'text/plain' });
				handlerRes.statusCode = HttpStatus.NOT_FOUND;
				handlerRes.send(AVATAR_NOT_FOUND_ERROR);
			} else {
				handlerRes.send(err.message);
			}
		});
	}

	@Delete('delete/avatar')
	@HttpCode(HttpStatus.NO_CONTENT)
	async removeAvatar(@GetCurrentUserId() id: string): Promise<void> {
		await this.userService.removeAvatar(id);
	}

	@Get('solved-problems')
	async getSolvedProblems(@GetCurrentUserId() id: string): Promise<UserSolvedProblem[]> {
		return await this.userService.getSolvedProblems(id);
	}

	@Get(':id/statistics')
	async getUserStatistics(@Param('id') userId: string): Promise<UserStatisticsDto> {
		return await this.userService.getUserStatistics(userId);
	}

	@Get(':id')
	@CheckPolicies(new PolicyHandler(Action.ReadOne, User))
	async findOne(@Param('id') id: string): Promise<AuthResponseDto> {
		const user = await this.userService.findOne({ id });
		if (!user) throw new NotFoundException(USER_NOT_FOUND_ERROR);
		return new AuthResponseDto(user);
	}
}
