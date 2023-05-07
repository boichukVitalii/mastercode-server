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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailConfirmationController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const get_current_userId_decorator_1 = require("../blocks/decorators/get-current-userId.decorator");
const public_decorator_1 = require("../blocks/decorators/public.decorator");
const confirm_email_dto_1 = require("./dto/confirm-email.dto");
const email_confirmation_service_1 = require("./email-confirmation.service");
const swagger_1 = require("@nestjs/swagger");
let EmailConfirmationController = class EmailConfirmationController {
    constructor(emailConfirmationService) {
        this.emailConfirmationService = emailConfirmationService;
    }
    async confirm(dto) {
        const email = await this.emailConfirmationService.decodeConfirmationToken(dto.token);
        await this.emailConfirmationService.confirmEmail(email);
    }
    async resendConfirmationLink(userId) {
        await this.emailConfirmationService.resendConfirmationLink(userId);
    }
};
__decorate([
    (0, common_1.Post)('confirm'),
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [confirm_email_dto_1.ConfirmEmailDto]),
    __metadata("design:returntype", Promise)
], EmailConfirmationController.prototype, "confirm", null);
__decorate([
    (0, common_1.Post)('resend-confirmation-link'),
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, get_current_userId_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmailConfirmationController.prototype, "resendConfirmationLink", null);
EmailConfirmationController = __decorate([
    (0, swagger_1.ApiTags)('email-confirmation'),
    (0, common_1.Controller)('email-confirmation'),
    __metadata("design:paramtypes", [email_confirmation_service_1.EmailConfirmationService])
], EmailConfirmationController);
exports.EmailConfirmationController = EmailConfirmationController;
//# sourceMappingURL=email-confirmation.controller.js.map