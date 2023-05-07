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
exports.ProblemQueryDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const problem_entity_1 = require("../entities/problem.entity");
const swagger_1 = require("@nestjs/swagger");
const pagination_query_dto_1 = require("../../common/dto/pagination-query.dto");
class ProblemQueryDto extends (0, swagger_1.PartialType)(pagination_query_dto_1.PaginationQueryDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return { category: { required: false, type: () => String }, title: { required: false, type: () => String }, difficulty: { required: false, type: () => Object } };
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProblemQueryDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProblemQueryDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(problem_entity_1.ProblemDifficulty),
    __metadata("design:type", String)
], ProblemQueryDto.prototype, "difficulty", void 0);
exports.ProblemQueryDto = ProblemQueryDto;
//# sourceMappingURL=problem-query.dto.js.map