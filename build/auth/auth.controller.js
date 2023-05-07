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
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const get_current_user_decorator_1 = require("../blocks/decorators/get-current-user.decorator");
const get_current_userId_decorator_1 = require("../blocks/decorators/get-current-userId.decorator");
const public_decorator_1 = require("../blocks/decorators/public.decorator");
const refresh_token_guard_1 = require("../blocks/guards/refresh-token.guard");
const email_confirmation_service_1 = require("../email-confirmation/email-confirmation.service");
const auth_service_1 = require("./auth.service");
const auth_response_dto_1 = require("./dto/auth-response.dto");
const signin_local_dto_1 = require("./dto/signin-local.dto");
const signup_local_dto_1 = require("./dto/signup-local.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const new_password_dto_1 = require("./dto/new-password.dto");
const swagger_1 = require("@nestjs/swagger");
const auth_constants_1 = require("./auth.constants");
const google_authentication_service_1 = require("./social/google-authentication.service");
const google_token_dto_1 = require("./dto/google-token.dto");
let AuthController = class AuthController {
    constructor(authService, emailConfirmationService, googleAuthService) {
        this.authService = authService;
        this.emailConfirmationService = emailConfirmationService;
        this.googleAuthService = googleAuthService;
    }
    async signupLocal(dto) {
        if (dto.password !== dto.confirm_password) {
            throw new common_1.BadRequestException(auth_constants_1.PASSWORDS_NOT_MATCH_ERROR);
        }
        const { user, tokens } = await this.authService.signupLocal(dto);
        await this.emailConfirmationService.sendVerificationLink(dto.email);
        return {
            user: new auth_response_dto_1.AuthResponseDto(user),
            tokens,
        };
    }
    async signinLocal(dto) {
        const { user, tokens } = await this.authService.signinLocal(dto);
        return {
            user: new auth_response_dto_1.AuthResponseDto(user),
            tokens,
        };
    }
    async auth(dto) {
        return this.googleAuthService.authenticate(dto.token);
    }
    async logout(userId) {
        await this.authService.logout(userId);
    }
    async refreshTokens(userId, refreshToken) {
        return this.authService.refreshTokens(userId, refreshToken);
    }
    async getPasswordResetToken({ email }) {
        await this.authService.generatePasswordResetToken(email);
    }
    async resetPassword(dto) {
        if (dto.password !== dto.confirm_password) {
            throw new common_1.BadRequestException(auth_constants_1.PASSWORDS_NOT_MATCH_ERROR);
        }
        await this.authService.resetPassword(dto.token, dto.password);
    }
};
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('local/signup'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_local_dto_1.SignupLocalDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signupLocal", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('local/signin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_local_dto_1.SigninLocalDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signinLocal", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('social/google'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [google_token_dto_1.GoogleTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "auth", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, get_current_userId_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.UseGuards)(refresh_token_guard_1.RefreshTokenGuard),
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, get_current_userId_decorator_1.GetCurrentUserId)()),
    __param(1, (0, get_current_user_decorator_1.GetCurrentUser)('refresh_token_hash')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshTokens", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('password-reset-token'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getPasswordResetToken", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('reset-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_password_dto_1.NewPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        email_confirmation_service_1.EmailConfirmationService,
        google_authentication_service_1.GoogleAuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map