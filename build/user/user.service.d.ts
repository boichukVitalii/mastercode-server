/// <reference types="multer" />
import { File } from 'src/file/entities/file.entity';
import { FileService } from 'src/file/file.service';
import { DataSource, DeepPartial, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ProblemService } from 'src/problem/problem.service';
import { UserSolvedProblem } from './entities/user-solved-problem.entity';
import { AddSolvedProblemDto } from './dto/add-solved-problem.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { UserStatistics } from './dto/user-statistics.dto';
export declare class UserService {
    private readonly userRepository;
    private readonly userSolvedProblemRepository;
    private readonly problemService;
    private readonly fileService;
    private readonly dataSource;
    constructor(userRepository: Repository<User>, userSolvedProblemRepository: Repository<UserSolvedProblem>, problemService: ProblemService, fileService: FileService, dataSource: DataSource);
    create(data: DeepPartial<User>): Promise<User>;
    findMany(options: UserQueryDto): Promise<User[]>;
    findOne(where: FindOptionsWhere<User>): Promise<User | null>;
    findOneOrThrow(where: FindOptionsWhere<User>): Promise<User>;
    updateOne(where: FindOptionsWhere<User>, data: DeepPartial<User>): Promise<User>;
    updateMany(options: FindManyOptions<User>, data: DeepPartial<User>): Promise<User[]>;
    remove(where: FindOptionsWhere<User>): Promise<User | null>;
    uploadAvatar(file: Express.Multer.File, userId: string): Promise<File>;
    getUserAvatar(userId: string): Promise<File | null>;
    removeAvatar(userId: string): Promise<void>;
    addSolvedProblem(data: AddSolvedProblemDto): Promise<void>;
    getSolvedProblems(userId: string): Promise<UserSolvedProblem[]>;
    getUserStatistics(userId: string): Promise<UserStatistics>;
}
