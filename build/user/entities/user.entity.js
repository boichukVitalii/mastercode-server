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
exports.User = exports.UserRole = void 0;
const openapi = require("@nestjs/swagger");
const password_reset_token_entity_1 = require("../../auth/entities/password-reset-token.entity");
const comment_entity_1 = require("../../comment/entities/comment.entity");
const file_entity_1 = require("../../file/entities/file.entity");
const problem_reaction_entity_1 = require("../../problem/entities/problem-reaction.entity");
const typeorm_1 = require("typeorm");
const user_solved_problem_entity_1 = require("./user-solved-problem.entity");
exports.UserRole = {
    USER: 'user',
    ADMIN: 'admin',
};
let User = class User {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, first_name: { required: true, type: () => String }, last_name: { required: true, type: () => String }, email: { required: true, type: () => String }, password_hash: { required: false, type: () => String, nullable: true }, avatar: { required: false, type: () => require("../../file/entities/file.entity").File, nullable: true }, avatar_id: { required: false, type: () => String, nullable: true }, additional_info: { required: false, type: () => String, nullable: true }, roles: { required: true, type: () => [Object] }, comments: { required: true, type: () => [require("../../comment/entities/comment.entity").Comment] }, is_email_confirmed: { required: true, type: () => Boolean }, password_reset_tokens: { required: true, type: () => [require("../../auth/entities/password-reset-token.entity").PasswordResetToken] }, google_id: { required: false, type: () => String, nullable: true }, problems_reactions: { required: true, type: () => [require("../../problem/entities/problem-reaction.entity").ProblemReaction] }, solved_problems: { required: true, type: () => [require("./user-solved-problem.entity").UserSolvedProblem] }, created_at: { required: true, type: () => Date }, updated_at: { required: true, type: () => Date }, refresh_token_hash: { required: false, type: () => String, nullable: true } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 254 }),
    __metadata("design:type", String)
], User.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 254 }),
    __metadata("design:type", String)
], User.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 254, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 254, nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "password_hash", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'avatar_id' }),
    (0, typeorm_1.OneToOne)(() => file_entity_1.File, { nullable: true, onDelete: 'SET NULL' }),
    __metadata("design:type", Object)
], User.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "avatar_id", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "additional_info", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: exports.UserRole, array: true, default: [exports.UserRole.USER] }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.user),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "is_email_confirmed", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => password_reset_token_entity_1.PasswordResetToken, (token) => token.user),
    __metadata("design:type", Array)
], User.prototype, "password_reset_tokens", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 254, nullable: true, unique: true }),
    __metadata("design:type", Object)
], User.prototype, "google_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => problem_reaction_entity_1.ProblemReaction, (problemReaction) => problemReaction.user),
    __metadata("design:type", Array)
], User.prototype, "problems_reactions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_solved_problem_entity_1.UserSolvedProblem, (solvedProblem) => solvedProblem.user),
    __metadata("design:type", Array)
], User.prototype, "solved_problems", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 254, nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "refresh_token_hash", void 0);
User = __decorate([
    (0, typeorm_1.Entity)('user')
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map