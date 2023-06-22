/// <reference types="multer" />
import { StreamableFile } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { AuthResponseDto } from 'src/auth/dto/auth-response.dto';
import { Response } from 'express';
import { AvatarResponseDto } from './dto/avatar-response.dto';
import { AddSolvedProblemDto } from './dto/add-solved-problem.dto';
import { UserSolvedProblem } from './entities/user-solved-problem.entity';
import { UserStatistics } from './dto/user-statistics.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findMany(query: UserQueryDto): Promise<AuthResponseDto[]>;
    update(id: string, dto: UpdateUserDto): Promise<AuthResponseDto>;
    remove(id: string): Promise<void>;
    uploadAvatar(file: Express.Multer.File, id: string): Promise<AvatarResponseDto>;
    getUserAvatar(id: string, res: Response): Promise<StreamableFile>;
    removeAvatar(id: string): Promise<void>;
    addSolvedProblems(userId: string, dto: AddSolvedProblemDto): Promise<void>;
    getSolvedProblems(id: string): Promise<UserSolvedProblem[]>;
    getUserStatistics(id: string): Promise<UserStatistics>;
    findOne(id: string): Promise<AuthResponseDto>;
}
