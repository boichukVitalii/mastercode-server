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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResponseDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const user_entity_1 = require("../../user/entities/user.entity");
const swagger_1 = require("@nestjs/swagger");
class AuthResponseDto {
    constructor(partial) {
        Object.assign(this, partial);
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, first_name: { required: true, type: () => String }, last_name: { required: true, type: () => String }, email: { required: true, type: () => String }, password_hash: { required: true, type: () => String }, avatar: { required: false, type: () => require("../../file/entities/file.entity").File, nullable: true }, additional_info: { required: false, type: () => String, nullable: true }, roles: { required: true, type: () => [Object] }, comments: { required: true, type: () => [require("../../comment/entities/comment.entity").Comment] }, is_email_confirmed: { required: true, type: () => Boolean }, solved_problems: { required: true, type: () => [require("../../user/entities/user-solved-problem.entity").UserSolvedProblem] }, password_reset_tokens: { required: true, type: () => [require("../entities/password-reset-token.entity").PasswordResetToken] }, problems_reactions: { required: true, type: () => [require("../../problem/entities/problem-reaction.entity").ProblemReaction] }, created_at: { required: true, type: () => Date }, updated_at: { required: true, type: () => Date }, refresh_token_hash: { required: false, type: () => String, nullable: true } };
    }
}
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "password_hash", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: user_entity_1.UserRole, isArray: true, default: [user_entity_1.UserRole.USER] }),
    __metadata("design:type", Array)
], AuthResponseDto.prototype, "roles", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Object)
], AuthResponseDto.prototype, "refresh_token_hash", void 0);
exports.AuthResponseDto = AuthResponseDto;
//# sourceMappingURL=auth-response.dto.js.map