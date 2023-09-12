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
exports.CompilerController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const problem_service_1 = require("../problem/problem.service");
const compiler_dto_1 = require("./dto/compiler.dto");
const swagger_1 = require("@nestjs/swagger");
const get_current_userId_decorator_1 = require("../blocks/decorators/get-current-userId.decorator");
const bull_1 = require("@nestjs/bull");
const compiler_constants_1 = require("./compiler.constants");
let CompilerController = class CompilerController {
    constructor(problemService, compilerQueue) {
        this.problemService = problemService;
        this.compilerQueue = compilerQueue;
    }
    async testUserSolution(dto, userId) {
        const problem = await this.problemService.findOneOrThrow({ id: dto.problemId });
        const job = await this.compilerQueue.add(compiler_constants_1.TASK_TESTING_PROCESS, {
            testingData: dto,
            userId,
            problem,
        });
        return { jobId: job.id };
    }
    async getJobResult(res, id) {
        const job = await this.compilerQueue.getJob(id);
        if (!job)
            throw new common_1.NotFoundException(`Job with ID ${id} not found`);
        const isCompleted = await job.isCompleted();
        if (!isCompleted) {
            res.status(common_1.HttpStatus.ACCEPTED);
            return { message: `Job with ID ${id} is not completed yet` };
        }
        await job.remove();
        return job.returnvalue;
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_current_userId_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [compiler_dto_1.CompilerDto, String]),
    __metadata("design:returntype", Promise)
], CompilerController.prototype, "testUserSolution", null);
__decorate([
    (0, common_1.Get)('job/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CompilerController.prototype, "getJobResult", null);
CompilerController = __decorate([
    (0, swagger_1.ApiTags)('compiler'),
    (0, common_1.Controller)('compiler'),
    __param(1, (0, bull_1.InjectQueue)(compiler_constants_1.COMPILE_QUEUE)),
    __metadata("design:paramtypes", [problem_service_1.ProblemService, Object])
], CompilerController);
exports.CompilerController = CompilerController;
//# sourceMappingURL=compiler.controller.js.map