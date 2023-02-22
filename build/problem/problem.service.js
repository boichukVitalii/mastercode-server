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
let ProblemService = class ProblemService {
    constructor(problemRepository) {
        this.problemRepository = problemRepository;
    }
    async create(dto) {
        const problem = this.problemRepository.create(dto);
        return this.problemRepository.save(problem);
    }
    async findAll(paginationQuery) {
        const { limit, offset } = paginationQuery;
        return this.problemRepository.find({
            skip: offset,
            take: limit,
        });
    }
    async findOne(id) {
        return this.problemRepository.findOneBy({ id });
    }
    async update(id, dto) {
        const problem = await this.findOne(id);
        if (!problem)
            return null;
        return this.problemRepository.save({ ...problem, ...dto });
    }
    async remove(id) {
        const problem = await this.findOne(id);
        if (!problem)
            return null;
        return this.problemRepository.remove(problem);
    }
};
ProblemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(problem_entity_1.Problem)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProblemService);
exports.ProblemService = ProblemService;
//# sourceMappingURL=problem.service.js.map