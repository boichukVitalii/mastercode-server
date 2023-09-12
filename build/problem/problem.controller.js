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
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const problem_service_1 = require("./problem.service");
const create_problem_dto_1 = require("./dto/create-problem.dto");
const update_problem_dto_1 = require("./dto/update-problem.dto");
const problem_constants_1 = require("./problem.constants");
const problem_entity_1 = require("./entities/problem.entity");
const pagination_query_dto_1 = require("../common/dto/pagination-query.dto");
const policy_handler_1 = require("../blocks/handlers/policy.handler");
const check_policies_decorator_1 = require("../blocks/decorators/check-policies.decorator");
const casl_types_type_1 = require("../casl/types/casl-types.type");
const swagger_1 = require("@nestjs/swagger");
const get_current_userId_decorator_1 = require("../blocks/decorators/get-current-userId.decorator");
const toggle_reaction_dto_1 = require("./dto/toggle-reaction.dto");
let ProblemController = class ProblemController {
    constructor(problemService) {
        this.problemService = problemService;
    }
    async create(dto) {
        return await this.problemService.create(dto);
    }
    async findMany(query) {
        const problems = await this.problemService.findMany(query);
        if (!problems.length)
            throw new common_1.NotFoundException(problem_constants_1.PROBLEMS_NOT_FOUND_ERROR);
        return problems;
    }
    async findOne(id) {
        return await this.problemService.findOneOrThrow({ id });
    }
    async update(id, dto) {
        return await this.problemService.updateOne({ id }, dto);
    }
    async remove(id) {
        await this.problemService.remove({ id });
    }
    async toggleReaction({ problem_id, reaction_type }, userId) {
        return await this.problemService.toggleReaction(problem_id, userId, reaction_type);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, check_policies_decorator_1.CheckPolicies)(new policy_handler_1.PolicyHandler(casl_types_type_1.Action.Create, problem_entity_1.Problem)),
    openapi.ApiResponse({ status: 201, type: require("./entities/problem.entity").Problem }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_problem_dto_1.CreateProblemDto]),
    __metadata("design:returntype", Promise)
], ProblemController.prototype, "create", null);
__decorate([
    (0, common_1.UseInterceptors)(common_1.CacheInterceptor),
    (0, common_1.CacheTTL)(1000 * 60),
    (0, common_1.Get)(),
    (0, check_policies_decorator_1.CheckPolicies)(new policy_handler_1.PolicyHandler(casl_types_type_1.Action.ReadMany, problem_entity_1.Problem)),
    openapi.ApiResponse({ status: 200, type: [require("./entities/problem.entity").Problem] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", Promise)
], ProblemController.prototype, "findMany", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, check_policies_decorator_1.CheckPolicies)(new policy_handler_1.PolicyHandler(casl_types_type_1.Action.ReadOne, problem_entity_1.Problem)),
    openapi.ApiResponse({ status: 200, type: require("./entities/problem.entity").Problem }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProblemController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, check_policies_decorator_1.CheckPolicies)(new policy_handler_1.PolicyHandler(casl_types_type_1.Action.Update, problem_entity_1.Problem)),
    openapi.ApiResponse({ status: 200, type: require("./entities/problem.entity").Problem }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_problem_dto_1.UpdateProblemDto]),
    __metadata("design:returntype", Promise)
], ProblemController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, check_policies_decorator_1.CheckPolicies)(new policy_handler_1.PolicyHandler(casl_types_type_1.Action.Delete, problem_entity_1.Problem)),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProblemController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('toggle-reaction'),
    openapi.ApiResponse({ status: 201, type: require("./dto/toggle-reaction-response.dto").ToggleReactionResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_current_userId_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [toggle_reaction_dto_1.ToggleReactionDto, String]),
    __metadata("design:returntype", Promise)
], ProblemController.prototype, "toggleReaction", null);
ProblemController = __decorate([
    (0, swagger_1.ApiTags)('problem'),
    (0, common_1.Controller)('problem'),
    __metadata("design:paramtypes", [problem_service_1.ProblemService])
], ProblemController);
exports.ProblemController = ProblemController;
//# sourceMappingURL=problem.controller.js.map