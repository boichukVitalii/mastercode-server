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
exports.CommentController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const check_policies_decorator_1 = require("../blocks/decorators/check-policies.decorator");
const policy_handler_1 = require("../blocks/handlers/policy.handler");
const casl_types_type_1 = require("../casl/types/casl-types.type");
const problem_service_1 = require("../problem/problem.service");
const comment_constants_1 = require("./comment.constants");
const comment_service_1 = require("./comment.service");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const update_comment_dto_1 = require("./dto/update-comment.dto");
const comment_entity_1 = require("./entities/comment.entity");
const swagger_1 = require("@nestjs/swagger");
const user_service_1 = require("../user/user.service");
const get_current_userId_decorator_1 = require("../blocks/decorators/get-current-userId.decorator");
const comment_query_dto_1 = require("./dto/comment-query.dto");
let CommentController = class CommentController {
    constructor(commentService, problemService, userService) {
        this.commentService = commentService;
        this.problemService = problemService;
        this.userService = userService;
    }
    async create(dto, userId) {
        const problem = await this.problemService.findOneOrThrow({ id: dto.problemId });
        const user = await this.userService.findOneOrThrow({ id: userId });
        return this.commentService.create(dto, user, problem);
    }
    async findMany(query) {
        const comments = await this.commentService.findMany(query);
        if (!comments.length)
            throw new common_1.NotFoundException(comment_constants_1.COMMENTS_NOT_FOUND_ERROR);
        return comments;
    }
    async findOne(id) {
        const comment = await this.commentService.findOneOrThrow({ id });
        return comment;
    }
    async update(id, dto) {
        const comment = await this.commentService.updateOne({ id }, dto);
        return comment;
    }
    async remove(id) {
        await this.commentService.remove({ id });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, check_policies_decorator_1.CheckPolicies)(new policy_handler_1.PolicyHandler(casl_types_type_1.Action.Create, comment_entity_1.Comment)),
    openapi.ApiResponse({ status: 201, type: require("./entities/comment.entity").Comment }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_current_userId_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_dto_1.CreateCommentDto, String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, check_policies_decorator_1.CheckPolicies)(new policy_handler_1.PolicyHandler(casl_types_type_1.Action.ReadMany, comment_entity_1.Comment)),
    openapi.ApiResponse({ status: 200, type: [require("./entities/comment.entity").Comment] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_query_dto_1.CommentQueryDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "findMany", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, check_policies_decorator_1.CheckPolicies)(new policy_handler_1.PolicyHandler(casl_types_type_1.Action.ReadOne, comment_entity_1.Comment)),
    openapi.ApiResponse({ status: 200, type: require("./entities/comment.entity").Comment }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, check_policies_decorator_1.CheckPolicies)(new policy_handler_1.PolicyHandler(casl_types_type_1.Action.Update, comment_entity_1.Comment)),
    openapi.ApiResponse({ status: 200, type: require("./entities/comment.entity").Comment }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_comment_dto_1.UpdateCommentDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, check_policies_decorator_1.CheckPolicies)(new policy_handler_1.PolicyHandler(casl_types_type_1.Action.Delete, comment_entity_1.Comment)),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "remove", null);
CommentController = __decorate([
    (0, swagger_1.ApiTags)('comment'),
    (0, common_1.Controller)('comment'),
    __metadata("design:paramtypes", [comment_service_1.CommentService,
        problem_service_1.ProblemService,
        user_service_1.UserService])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map