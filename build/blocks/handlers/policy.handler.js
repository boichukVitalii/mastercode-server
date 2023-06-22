"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyHandler = void 0;
const config_1 = __importDefault(require("../../config"));
class PolicyHandler {
    constructor(action, entity) {
        this.action = action;
        this.entity = entity;
    }
    async handle(ability, id) {
        if (!id)
            return ability.can(this.action, this.entity);
        const dataSource = await config_1.default.dataSourceInit;
        const record = await dataSource.getRepository(this.entity).findOneByOrFail({ id });
        console.log('Record', record);
        return ability.can(this.action, record);
    }
}
exports.PolicyHandler = PolicyHandler;
//# sourceMappingURL=policy.handler.js.map