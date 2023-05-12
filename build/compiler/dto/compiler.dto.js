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
exports.CompilerDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_solved_problem_entity_1 = require("../../user/entities/user-solved-problem.entity");
class CompilerDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { lang: { required: true, type: () => Object }, code: { required: true, type: () => Object }, problemId: { required: true, type: () => String }, submit: { required: false, type: () => Boolean } };
    }
}
__decorate([
    (0, class_validator_1.IsEnum)(user_solved_problem_entity_1.Language),
    __metadata("design:type", String)
], CompilerDto.prototype, "lang", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CompilerDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CompilerDto.prototype, "problemId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CompilerDto.prototype, "submit", void 0);
exports.CompilerDto = CompilerDto;
//# sourceMappingURL=compiler.dto.js.map