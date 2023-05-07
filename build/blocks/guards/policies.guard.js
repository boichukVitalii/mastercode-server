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
exports.PoliciesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const casl_ability_factory_1 = require("../../casl/casl-ability.factory/casl-ability.factory");
const check_policies_decorator_1 = require("../decorators/check-policies.decorator");
let PoliciesGuard = class PoliciesGuard {
    constructor(reflector, caslAbilityFactory) {
        this.reflector = reflector;
        this.caslAbilityFactory = caslAbilityFactory;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic)
            return true;
        const policyHandlers = this.reflector.get(check_policies_decorator_1.CHECK_POLICIES_KEY, context.getHandler()) || [];
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const id = request.params.id;
        const ability = this.caslAbilityFactory.createForUser(user);
        for (const handler of policyHandlers) {
            const result = await handler.handle(ability, id);
            if (!result)
                return false;
        }
        return true;
    }
};
PoliciesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector, casl_ability_factory_1.CaslAbilityFactory])
], PoliciesGuard);
exports.PoliciesGuard = PoliciesGuard;
//# sourceMappingURL=policies.guard.js.map