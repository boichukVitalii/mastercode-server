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
const openapi = require("@nestjs/swagger");
const comment_entity_1 = require("../../comment/entities/comment.entity");
const category_entity_1 = require("../../category/entities/category.entity");
const typeorm_1 = require("typeorm");
const problem_reaction_entity_1 = require("./problem-reaction.entity");
const user_solved_problem_entity_1 = require("../../user/entities/user-solved-problem.entity");
exports.ProblemDifficulty = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard',
};
let Problem = class Problem {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, title: { required: true, type: () => String }, description: { required: true, type: () => String }, difficulty: { required: true, type: () => Object }, solution: { required: true, type: () => String }, likes: { required: true, type: () => Number }, dislikes: { required: true, type: () => Number }, constraints: { required: true, type: () => [String] }, inputs: { required: true, type: () => Object }, outputs: { required: true, type: () => Object }, category: { required: true, type: () => require("../../category/entities/category.entity").Category }, category_id: { required: true, type: () => String }, comments: { required: true, type: () => [require("../../comment/entities/comment.entity").Comment] }, problems_reactions: { required: true, type: () => [require("./problem-reaction.entity").ProblemReaction] }, solved_problems: { required: true, type: () => [require("../../user/entities/user-solved-problem.entity").UserSolvedProblem] }, created_at: { required: true, type: () => Date }, updated_at: { required: true, type: () => Date } };
    }
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
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], Problem.prototype, "category_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.problem),
    __metadata("design:type", Array)
], Problem.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => problem_reaction_entity_1.ProblemReaction, (problemReaction) => problemReaction.problem),
    __metadata("design:type", Array)
], Problem.prototype, "problems_reactions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_solved_problem_entity_1.UserSolvedProblem, (solvedProblem) => solvedProblem.problem),
    __metadata("design:type", Array)
], Problem.prototype, "solved_problems", void 0);
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