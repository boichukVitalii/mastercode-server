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
exports.ProblemReaction = exports.ReactionType = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const problem_entity_1 = require("./problem.entity");
exports.ReactionType = {
    LIKES: 'likes',
    DISLIKES: 'dislikes',
};
let ProblemReaction = class ProblemReaction {
    static _OPENAPI_METADATA_FACTORY() {
        return { problem_id: { required: true, type: () => String }, user_id: { required: true, type: () => String }, reaction_type: { required: true, type: () => Object }, problem: { required: true, type: () => require("./problem.entity").Problem }, user: { required: true, type: () => require("../../user/entities/user.entity").User } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid'),
    __metadata("design:type", String)
], ProblemReaction.prototype, "problem_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid'),
    __metadata("design:type", String)
], ProblemReaction.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: exports.ReactionType }),
    __metadata("design:type", String)
], ProblemReaction.prototype, "reaction_type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => problem_entity_1.Problem, (problem) => problem.problems_reactions, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'problem_id' }),
    __metadata("design:type", problem_entity_1.Problem)
], ProblemReaction.prototype, "problem", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.problems_reactions, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], ProblemReaction.prototype, "user", void 0);
ProblemReaction = __decorate([
    (0, typeorm_1.Entity)('problem_reaction')
], ProblemReaction);
exports.ProblemReaction = ProblemReaction;
//# sourceMappingURL=problem-reaction.entity.js.map