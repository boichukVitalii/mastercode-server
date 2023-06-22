"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const custom_errors_1 = require("../errors/custom-errors");
const file_service_1 = require("../file/file.service");
const mfile_class_1 = require("../file/mfile.class");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const user_constants_1 = require("./user.constants");
const problem_service_1 = require("../problem/problem.service");
const problem_entity_1 = require("../problem/entities/problem.entity");
const user_solved_problem_entity_1 = require("./entities/user-solved-problem.entity");
let UserService = class UserService {
    constructor(userRepository, userSolvedProblemRepository, problemService, fileService, dataSource) {
        this.userRepository = userRepository;
        this.userSolvedProblemRepository = userSolvedProblemRepository;
        this.problemService = problemService;
        this.fileService = fileService;
        this.dataSource = dataSource;
    }
    async create(data) {
        const user = this.userRepository.create(data);
        return this.userRepository.save(user);
    }
    async findMany(options) {
        const { skip, take, email } = options;
        return this.userRepository.find({ skip, take, where: { email } });
    }
    async findOne(where) {
        return this.userRepository.findOneBy(where);
    }
    async findOneOrThrow(where) {
        const user = await this.userRepository.findOneBy(where);
        if (!user)
            throw new custom_errors_1.EntityNotFoundCustomError(user_constants_1.USER_NOT_FOUND_ERROR);
        return user;
    }
    async updateOne(where, data) {
        const user = await this.findOneOrThrow(where);
        return this.userRepository.save({ ...user, ...data });
    }
    async updateMany(options, data) {
        const users = await this.findMany(options);
        if (!users.length)
            return [];
        return this.userRepository.save(users.map((user) => ({ ...user, ...data })));
    }
    async remove(where) {
        const user = await this.findOneOrThrow(where);
        return this.userRepository.remove(user);
    }
    async uploadAvatar(file, userId) {
        const user = await this.findOneOrThrow({ id: userId });
        if (user.avatar_id)
            await this.removeAvatar(userId);
        const bufferWebP = await this.fileService.convertToWebP(file.buffer);
        const filename = `avatar-${userId}.webp`;
        const mimetype = 'image/webp';
        const mfile = new mfile_class_1.MFile(filename, mimetype, bufferWebP);
        const folderToSave = 'avatars';
        const avatar = (await this.fileService.saveFiles([mfile], folderToSave))[0];
        user.avatar_id = avatar.id;
        await this.userRepository.save({ ...user });
        return avatar;
    }
    async getUserAvatar(userId) {
        const user = await this.findOneOrThrow({ id: userId });
        if (!user.avatar_id)
            return null;
        return this.fileService.getFileById(user.avatar_id);
    }
    async removeAvatar(userId) {
        const queryRunner = this.dataSource.createQueryRunner();
        const user = await this.findOneOrThrow({ id: userId });
        if (!user.avatar_id)
            return;
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.update(user_entity_1.User, { id: userId }, { ...user, avatar_id: null });
            await this.fileService.removeFileWithQueryRunner(user.avatar_id, queryRunner);
            await queryRunner.commitTransaction();
        }
        catch (e) {
            await queryRunner.rollbackTransaction();
            throw e;
        }
        finally {
            await queryRunner.release();
        }
    }
    async addSolvedProblem(data) {
        const solvedProblem = this.userSolvedProblemRepository.create({ ...data });
        await this.userSolvedProblemRepository.save(solvedProblem);
    }
    async getSolvedProblems(userId) {
        return this.userSolvedProblemRepository.find({
            where: { user_id: userId },
            relations: {
                problem: true,
            },
        });
    }
    async getUserStatistics(userId) {
        const solvedProblems = await this.getSolvedProblems(userId);
        const numberOfSolvedProblems = solvedProblems.length;
        const numberOfEasyProblems = await this.problemService.getNumberOfProblemsBy({
            difficulty: problem_entity_1.ProblemDifficulty.EASY,
        });
        const numberOfMediumProblems = await this.problemService.getNumberOfProblemsBy({
            difficulty: problem_entity_1.ProblemDifficulty.MEDIUM,
        });
        const numberOfHardProblems = await this.problemService.getNumberOfProblemsBy({
            difficulty: problem_entity_1.ProblemDifficulty.HARD,
        });
        const numberOfSolvedEasyProblems = await this.userSolvedProblemRepository.countBy({
            problem: {
                difficulty: problem_entity_1.ProblemDifficulty.EASY,
            },
            user_id: userId,
        });
        const numberOfSolvedMediumProblems = await this.userSolvedProblemRepository.countBy({
            problem: {
                difficulty: problem_entity_1.ProblemDifficulty.MEDIUM,
            },
            user_id: userId,
        });
        const numberOfSolvedHardProblems = await this.userSolvedProblemRepository.countBy({
            problem: {
                difficulty: problem_entity_1.ProblemDifficulty.HARD,
            },
            user_id: userId,
        });
        return {
            numberOfSolvedProblems,
            numberOfEasyProblems,
            numberOfHardProblems,
            numberOfMediumProblems,
            numberOfSolvedEasyProblems,
            numberOfSolvedMediumProblems,
            numberOfSolvedHardProblems,
        };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(user_solved_problem_entity_1.UserSolvedProblem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        problem_service_1.ProblemService,
        file_service_1.FileService,
        typeorm_2.DataSource])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map