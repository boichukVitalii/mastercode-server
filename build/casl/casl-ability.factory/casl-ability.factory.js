"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaslAbilityFactory = void 0;
const ability_1 = require("@casl/ability");
const common_1 = require("@nestjs/common");
const comment_entity_1 = require("../../comment/entities/comment.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const category_entity_1 = require("../../category/entities/category.entity");
const problem_entity_1 = require("../../problem/entities/problem.entity");
const casl_types_type_1 = require("../types/casl-types.type");
let CaslAbilityFactory = class CaslAbilityFactory {
    createForUser(user, paramsId) {
        const { can, build } = new ability_1.AbilityBuilder(ability_1.createMongoAbility);
        if (user.roles.includes('admin')) {
            can(casl_types_type_1.Action.Manage, [problem_entity_1.Problem, category_entity_1.Category]);
        }
        if (paramsId && paramsId === user.sub) {
            can([casl_types_type_1.Action.Update, casl_types_type_1.Action.Delete], user_entity_1.User);
        }
        can([casl_types_type_1.Action.ReadOne, casl_types_type_1.Action.ReadMany], 'all');
        can(casl_types_type_1.Action.Create, comment_entity_1.Comment);
        can([casl_types_type_1.Action.Update, casl_types_type_1.Action.Delete], comment_entity_1.Comment, { 'user.id': user.sub });
        return build({
            detectSubjectType: (item) => item.constructor,
        });
    }
};
CaslAbilityFactory = __decorate([
    (0, common_1.Injectable)()
], CaslAbilityFactory);
exports.CaslAbilityFactory = CaslAbilityFactory;
//# sourceMappingURL=casl-ability.factory.js.map