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
exports.Problem = exports.ProblemDifficulty = void 0;
const comment_entity_1 = require("../../comment/entities/comment.entity");
const category_entity_1 = require("../../category/entities/category.entity");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
exports.ProblemDifficulty = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard',
};
let Problem = class Problem {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Problem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 254, unique: true }),
    __metadata("design:type", String)
], Problem.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Problem.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: exports.ProblemDifficulty }),
    __metadata("design:type", String)
], Problem.prototype, "difficulty", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Problem.prototype, "solution", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { default: 0 }),
    __metadata("design:type", Number)
], Problem.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { default: 0 }),
    __metadata("design:type", Number)
], Problem.prototype, "dislikes", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: [] }),
    __metadata("design:type", Array)
], Problem.prototype, "constraints", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Object)
], Problem.prototype, "inputs", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Object)
], Problem.prototype, "outputs", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (category) => category.problems),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", category_entity_1.Category)
], Problem.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.problem),
    __metadata("design:type", Array)
], Problem.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User),
    __metadata("design:type", Array)
], Problem.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Problem.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Problem.prototype, "updated_at", void 0);
Problem = __decorate([
    (0, typeorm_1.Entity)('problem')
], Problem);
exports.Problem = Problem;
//# sourceMappingURL=problem.entity.js.map