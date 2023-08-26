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
exports.UserController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_entity_1 = require("./entities/user.entity");
const user_constants_1 = require("./user.constants");
const user_query_dto_1 = require("./dto/user-query.dto");
const auth_response_dto_1 = require("../auth/dto/auth-response.dto");
const casl_types_type_1 = require("../casl/types/casl-types.type");
const platform_express_1 = require("@nestjs/platform-express");
const get_current_userId_decorator_1 = require("../blocks/decorators/get-current-userId.decorator");
const node_fs_1 = require("node:fs");
const check_policies_decorator_1 = require("../blocks/decorators/check-policies.decorator");
const policy_handler_1 = require("../blocks/handlers/policy.handler");
const swagger_1 = require("@nestjs/swagger");
const avatar_response_dto_1 = require("./dto/avatar-response.dto");
const add_solved_problem_dto_1 = require("./dto/add-solved-problem.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async findMany(query) {
        const users = await this.userService.findMany(query);
        if (!users.length)
            throw new common_1.NotFoundException(user_constants_1.USERS_NOT_FOUND_ERROR);
        return users.map((user) => new auth_response_dto_1.AuthResponseDto(user));
    }
    async update(id, dto) {
        const user = await this.userService.updateOne({ id }, dto);
        if (!user)
            throw new common_1.NotFoundException(user_constants_1.USER_NOT_FOUND_ERROR);
        return new auth_response_dto_1.AuthResponseDto(user);
    }
    async remove(id) {
        const user = await this.userService.remove({ id });
        if (!user)
            throw new common_1.NotFoundException(user_constants_1.USER_NOT_FOUND_ERROR);
    }
    async uploadAvatar(file, id) {
        const avatar = await this.userService.uploadAvatar(file, id);
        return new avatar_response_dto_1.AvatarResponseDto(avatar);
    }
    async getUserAvatar(id, res) {
        const avatar = await this.userService.getUserAvatar(id);
        if (!avatar)
            throw new common_1.NotFoundException(user_constants_1.AVATAR_NOT_FOUND_ERROR);
        const stream = (0, node_fs_1.createReadStream)(avatar.path);
        res.set({ 'Content-Type': avatar.mimetype });
        return new common_1.StreamableFile(stream);
    }
    async removeAvatar(id) {
        await this.userService.removeAvatar(id);
    }
    async addSolvedProblems(userId, dto) {
        dto.user_id = userId;
        await this.userService.addSolvedProblem({ ...dto });
    }
    async getSolvedProblems(id) {
        return await this.userService.getSolvedProblems(id);
    }
    async getUserStatistics(userId) {
        return await this.userService.getUserStatistics(userId);
    }
    async findOne(id) {
        const user = await this.userService.findOne({ id });
        if (!user)
            throw new common_1.NotFoundException(user_constants_1.USER_NOT_FOUND_ERROR);
        return new auth_response_dto_1.AuthResponseDto(user);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, check_policies_decorator_1.CheckPolicies)(new policy_handler_1.PolicyHandler(casl_types_type_1.Action.ReadMany, user_entity_1.User)),
    openapi.ApiResponse({ status: 200, type: [require("../auth/dto/auth-response.dto").AuthResponseDto] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_query_dto_1.UserQueryDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findMany", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, check_policies_decorator_1.CheckPolicies)(new policy_handler_1.PolicyHandler(casl_types_type_1.Action.Update, user_entity_1.User)),
    openapi.ApiResponse({ status: 200, type: require("../auth/dto/auth-response.dto").AuthResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, check_policies_decorator_1.CheckPolicies)(new policy_handler_1.PolicyHandler(casl_types_type_1.Action.Delete, user_entity_1.User)),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('avatar'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ description: `User's profile picture` }),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiForbiddenResponse)(),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("./dto/avatar-response.dto").AvatarResponseDto }),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: Math.pow(1024, 2) * 5 })
        .addFileTypeValidator({ fileType: /png|jpeg|jpg|webp/ })
        .build({
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
    }))),
    __param(1, (0, get_current_userId_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadAvatar", null);
__decorate([
    (0, common_1.Get)(':id/avatar'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserAvatar", null);
__decorate([
    (0, common_1.Delete)('delete/avatar'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, get_current_userId_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "removeAvatar", null);
__decorate([
    (0, common_1.Post)('add-solved-problem'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, get_current_userId_decorator_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_solved_problem_dto_1.AddSolvedProblemDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addSolvedProblems", null);
__decorate([
    (0, common_1.Get)('solved-problems'),
    openapi.ApiResponse({ status: 200, type: [require("./entities/user-solved-problem.entity").UserSolvedProblem] }),
    __param(0, (0, get_current_userId_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getSolvedProblems", null);
__decorate([
    (0, common_1.Get)(':id/statistics'),
    openapi.ApiResponse({ status: 200, type: require("./dto/user-statistics.dto").UserStatisticsDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserStatistics", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, check_policies_decorator_1.CheckPolicies)(new policy_handler_1.PolicyHandler(casl_types_type_1.Action.ReadOne, user_entity_1.User)),
    openapi.ApiResponse({ status: 200, type: require("../auth/dto/auth-response.dto").AuthResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map