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
exports.ProblemService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const problem_entity_1 = require("./entities/problem.entity");
const problem_reaction_entity_1 = require("./entities/problem-reaction.entity");
const custom_errors_1 = require("../errors/custom-errors");
const problem_constants_1 = require("./problem.constants");
const toggle_reaction_response_dto_1 = require("./dto/toggle-reaction-response.dto");
let ProblemService = class ProblemService {
    constructor(problemRepository, problemReactionRepository) {
        this.problemRepository = problemRepository;
        this.problemReactionRepository = problemReactionRepository;
    }
    async create(data) {
        const problem = this.problemRepository.create(data);
        return await this.problemRepository.save(problem);
    }
    async findMany(options) {
        const { skip, take, category, difficulty, title } = options;
        return await this.problemRepository.find({
            skip: skip,
            take: take,
            where: {
                category: { name: category },
                difficulty,
                title,
            },
            relations: {
                category: true,
            },
        });
    }
    async findOne(where) {
        return await this.problemRepository.findOneBy(where);
    }
    async findOneOrThrow(where) {
        const problem = await this.problemRepository.findOneBy(where);
        if (!problem)
            throw new custom_errors_1.EntityNotFoundCustomError(problem_constants_1.PROBLEM_NOT_FOUND_ERROR);
        return problem;
    }
    async updateOne(where, data) {
        const problem = await this.findOneOrThrow(where);
        return await this.problemRepository.save({ ...problem, ...data });
    }
    async remove(where) {
        const problem = await this.findOneOrThrow(where);
        return await this.problemRepository.remove(problem);
    }
    async toggleReaction(problemId, userId, reactionType) {
        const existedProblemReaction = await this.problemReactionRepository.findOneBy({
            problem_id: problemId,
            user_id: userId,
        });
        if (existedProblemReaction) {
            await this.problemReactionRepository.remove(existedProblemReaction);
            if (reactionType === existedProblemReaction.reaction_type) {
                const problem = await this.countChangedReactionsAndUpdate(problemId, existedProblemReaction.reaction_type);
                return new toggle_reaction_response_dto_1.ToggleReactionResponseDto(problem);
            }
        }
        const problemReaction = this.problemReactionRepository.create({
            problem_id: problemId,
            user_id: userId,
            reaction_type: reactionType,
        });
        await this.problemReactionRepository.save(problemReaction);
        const problem = await this.countChangedReactionsAndUpdate(problemId, reactionType, existedProblemReaction?.reaction_type);
        return new toggle_reaction_response_dto_1.ToggleReactionResponseDto(problem);
    }
    async countChangedReactionsAndUpdate(problemId, reactionType, removedReactionType) {
        const reactionCount = await this.problemReactionRepository.countBy({
            problem_id: problemId,
            reaction_type: reactionType,
        });
        const problem = await this.updateOne({ id: problemId }, { [reactionType]: reactionCount });
        if (removedReactionType) {
            return await this.updateOne({ id: problemId }, { [removedReactionType]: problem[removedReactionType] - 1 });
        }
        return problem;
    }
    async getNumberOfProblemsBy(where) {
        return await this.problemRepository.countBy(where);
    }
};
ProblemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(problem_entity_1.Problem)),
    __param(1, (0, typeorm_1.InjectRepository)(problem_reaction_entity_1.ProblemReaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProblemService);
exports.ProblemService = ProblemService;
//# sourceMappingURL=problem.service.js.map