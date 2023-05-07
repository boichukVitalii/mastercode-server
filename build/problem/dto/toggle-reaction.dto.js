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
exports.ToggleReactionDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const problem_reaction_entity_1 = require("../entities/problem-reaction.entity");
class ToggleReactionDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { problem_id: { required: true, type: () => String }, reaction_type: { required: true, type: () => Object } };
    }
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ToggleReactionDto.prototype, "problem_id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(problem_reaction_entity_1.ReactionType),
    __metadata("design:type", String)
], ToggleReactionDto.prototype, "reaction_type", void 0);
exports.ToggleReactionDto = ToggleReactionDto;
//# sourceMappingURL=toggle-reaction.dto.js.map