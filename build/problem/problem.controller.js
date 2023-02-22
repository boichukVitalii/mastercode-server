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
exports.ProblemController = void 0;
const common_1 = require("@nestjs/common");
const problem_service_1 = require("./problem.service");
const create_problem_dto_1 = require("./dto/create-problem.dto");
const update_problem_dto_1 = require("./dto/update-problem.dto");
const problem_constants_1 = require("./problem.constants");
const pagination_query_dto_1 = require("../common/dto/pagination-query.dto");
let ProblemController = class ProblemController {
    constructor(problemService) {
        this.problemService = problemService;
    }
    async create(dto) {
        return this.problemService.create(dto);
    }
    async findAll(paginationQuery) {
        return this.problemService.findAll(paginationQuery);
    }
    async findOne(id) {
        const problem = await this.problemService.findOne(id);
        if (!problem)
            throw new common_1.NotFoundException(problem_constants_1.PROBLEM_NOT_FOUND_ERROR);
        return problem;
    }
    async update(id, dto) {
        const problem = await this.problemService.update(id, dto);
        if (!problem)
            throw new common_1.NotFoundException(problem_constants_1.PROBLEM_NOT_FOUND_ERROR);
        return problem;
    }
    async remove(id) {
        const problem = await this.problemService.remove(id);
        if (!problem)
            throw new common_1.NotFoundException(problem_constants_1.PROBLEM_NOT_FOUND_ERROR);
        return problem;
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_problem_dto_1.CreateProblemDto]),
    __metadata("design:returntype", Promise)
], ProblemController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", Promise)
], ProblemController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProblemController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_problem_dto_1.UpdateProblemDto]),
    __metadata("design:returntype", Promise)
], ProblemController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProblemController.prototype, "remove", null);
ProblemController = __decorate([
    (0, common_1.Controller)('problems'),
    __metadata("design:paramtypes", [problem_service_1.ProblemService])
], ProblemController);
exports.ProblemController = ProblemController;
//# sourceMappingURL=problem.controller.js.map