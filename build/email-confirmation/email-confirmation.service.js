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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailConfirmationService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = __importDefault(require("../config"));
const email_service_1 = require("../email/email.service");
const custom_errors_1 = require("../errors/custom-errors");
const user_service_1 = require("../user/user.service");
const email_constants_1 = require("./email.constants");
const html_1 = require("../assets/html");
let EmailConfirmationService = class EmailConfirmationService {
    constructor(jwtService, emailService, userService) {
        this.jwtService = jwtService;
        this.emailService = emailService;
        this.userService = userService;
    }
    async sendVerificationLink(email) {
        const payload = { email };
        const token = await this.jwtService.signAsync(payload, {
            secret: config_1.default.verificationSecret,
            expiresIn: config_1.default.verificationExpire,
        });
        const url = `${config_1.default.emailConfirmationUrl}?token=${token}`;
        const subject = 'Email confirmation';
        const html = (0, html_1.emailConfirmationHTML)(url);
        return this.emailService.sendMail({
            from: config_1.default.emailFrom,
            to: email,
            subject,
            html,
        });
    }
    async confirmEmail(email) {
        const user = await this.userService.findOne({ email });
        if (!user)
            throw new custom_errors_1.EntityNotFoundCustomError((0, email_constants_1.NO_USER_WITH_SUCH_EMAIL)(email));
        if (user.is_email_confirmed)
            throw new custom_errors_1.ServerConflictError(email_constants_1.EMAIL_ALREADY_CONFIRMED);
        await this.userService.updateOne({ email }, { is_email_confirmed: true });
    }
    async decodeConfirmationToken(token) {
        const payload = await this.jwtService.verify(token, {
            secret: config_1.default.verificationSecret,
        });
        if (typeof payload === 'object' && 'email' in payload)
            return payload.email;
        throw new Error(email_constants_1.TOKEN_VERIFICATION_ERROR);
    }
    async resendConfirmationLink(id) {
        const user = await this.userService.findOneOrThrow({ id });
        if (user.is_email_confirmed)
            throw new custom_errors_1.ServerConflictError(email_constants_1.EMAIL_ALREADY_CONFIRMED);
        await this.sendVerificationLink(user.email);
    }
};
EmailConfirmationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        email_service_1.EmailService,
        user_service_1.UserService])
], EmailConfirmationService);
exports.EmailConfirmationService = EmailConfirmationService;
//# sourceMappingURL=email-confirmation.service.js.map