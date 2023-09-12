/// <reference types="multer" />
import { StreamableFile } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { AuthResponseDto } from '../auth/dto/auth-response.dto';
import { Response } from 'express';
import { AvatarResponseDto } from './dto/avatar-response.dto';
import { UserSolvedProblem } from './entities/user-solved-problem.entity';
import { UserStatisticsDto } from './dto/user-statistics.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findMany(query: UserQueryDto): Promise<AuthResponseDto[]>;
    update(id: string, dto: UpdateUserDto): Promise<AuthResponseDto>;
    remove(id: string): Promise<void>;
    uploadAvatar(file: Express.Multer.File, id: string): Promise<AvatarResponseDto>;
    getUserAvatar(id: string, res: Response): Promise<StreamableFile>;
    removeAvatar(id: string): Promise<void>;
    getSolvedProblems(id: string): Promise<UserSolvedProblem[]>;
    getUserStatistics(userId: string): Promise<UserStatisticsDto>;
    findOne(id: string): Promise<AuthResponseDto>;
}
