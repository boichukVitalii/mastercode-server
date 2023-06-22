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
exports.CreateProblemDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const problem_entity_1 = require("../entities/problem.entity");
class CreateProblemDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String }, description: { required: true, type: () => String }, difficulty: { required: true, type: () => Object }, solution: { required: true, type: () => String }, constraints: { required: true, type: () => [String] }, category_id: { required: true, type: () => String }, inputs: { required: true, type: () => Object }, outputs: { required: true, type: () => Object } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProblemDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProblemDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(problem_entity_1.ProblemDifficulty),
    __metadata("design:type", String)
], CreateProblemDto.prototype, "difficulty", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProblemDto.prototype, "solution", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateProblemDto.prototype, "constraints", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProblemDto.prototype, "category_id", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateProblemDto.prototype, "inputs", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateProblemDto.prototype, "outputs", void 0);
exports.CreateProblemDto = CreateProblemDto;
//# sourceMappingURL=create-problem.dto.js.map