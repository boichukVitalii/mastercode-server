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
exports.SignupLocalDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_password_validator_1 = require("../../blocks/validators/is-password.validator");
const MIN_PASSWORD_LENGTH = 8;
class SignupLocalDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { first_name: { required: true, type: () => String }, last_name: { required: true, type: () => String }, email: { required: true, type: () => String }, additional_info: { required: false, type: () => String }, password: { required: true, type: () => String }, confirm_password: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignupLocalDto.prototype, "first_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignupLocalDto.prototype, "last_name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SignupLocalDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignupLocalDto.prototype, "additional_info", void 0);
__decorate([
    (0, is_password_validator_1.IsPassword)(MIN_PASSWORD_LENGTH),
    __metadata("design:type", String)
], SignupLocalDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignupLocalDto.prototype, "confirm_password", void 0);
exports.SignupLocalDto = SignupLocalDto;
//# sourceMappingURL=signup-local.dto.js.map