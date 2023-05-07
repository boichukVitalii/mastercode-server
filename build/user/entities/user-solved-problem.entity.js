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
exports.UserSolvedProblem = exports.Language = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const problem_entity_1 = require("../../problem/entities/problem.entity");
exports.Language = {
    JS: 'js',
    PYTHON: 'py',
};
let UserSolvedProblem = class UserSolvedProblem {
    static _OPENAPI_METADATA_FACTORY() {
        return { problem_id: { required: true, type: () => String }, user_id: { required: true, type: () => String }, run_time: { required: true, type: () => Number }, language: { required: true, type: () => Object }, problem: { required: true, type: () => require("../../problem/entities/problem.entity").Problem }, user: { required: true, type: () => require("./user.entity").User }, created_at: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid'),
    __metadata("design:type", String)
], UserSolvedProblem.prototype, "problem_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid'),
    __metadata("design:type", String)
], UserSolvedProblem.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], UserSolvedProblem.prototype, "run_time", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: exports.Language }),
    __metadata("design:type", String)
], UserSolvedProblem.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => problem_entity_1.Problem, (problem) => problem.solved_problems, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'problem_id' }),
    __metadata("design:type", problem_entity_1.Problem)
], UserSolvedProblem.prototype, "problem", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.solved_problems, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], UserSolvedProblem.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserSolvedProblem.prototype, "created_at", void 0);
UserSolvedProblem = __decorate([
    (0, typeorm_1.Entity)('user_solved_problem')
], UserSolvedProblem);
exports.UserSolvedProblem = UserSolvedProblem;
//# sourceMappingURL=user-solved-problem.entity.js.map