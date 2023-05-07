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
exports.GoogleAuthService = void 0;
const common_1 = require("@nestjs/common");
const google_auth_library_1 = require("google-auth-library");
const auth_service_1 = require("../auth.service");
const config_1 = __importDefault(require("../../config"));
const custom_errors_1 = require("../../errors/custom-errors");
const user_service_1 = require("../../user/user.service");
const email_confirmation_service_1 = require("../../email-confirmation/email-confirmation.service");
const auth_constants_1 = require("../auth.constants");
let GoogleAuthService = class GoogleAuthService {
    constructor(authService, userService, emailConfirmationService) {
        this.authService = authService;
        this.userService = userService;
        this.emailConfirmationService = emailConfirmationService;
    }
    onModuleInit() {
        const clientId = config_1.default.googleClientId;
        const clientSecret = config_1.default.googleClientSecret;
        this.oauthClient = new google_auth_library_1.OAuth2Client(clientId, clientSecret);
    }
    async authenticate(token) {
        const loginTicket = await this.oauthClient.verifyIdToken({
            idToken: token,
        });
        const { email, sub: google_id, name } = loginTicket.getPayload();
        if (!email)
            throw new custom_errors_1.WrongCredentialsError(auth_constants_1.COULD_NOT_OBTAIN_EMAIL_GOOGLE_ERROR);
        const [first_name, last_name] = name ? name.split(' ') : ['Unknown', 'Unknown'];
        const user = await this.userService.findOne({ google_id });
        if (user) {
            const tokens = await this.authService.getTokens({
                sub: user.id,
                email: user.email,
                roles: user.roles,
                isEmailConfirmed: true,
            });
            return { user, tokens };
        }
        const newUser = await this.userService.create({ email, google_id, first_name, last_name });
        await this.emailConfirmationService.confirmEmail(email);
        const tokens = await this.authService.getTokens({
            sub: newUser.id,
            email: newUser.email,
            roles: newUser.roles,
            isEmailConfirmed: true,
        });
        return { user: newUser, tokens };
    }
};
GoogleAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService,
        email_confirmation_service_1.EmailConfirmationService])
], GoogleAuthService);
exports.GoogleAuthService = GoogleAuthService;
//# sourceMappingURL=google-authentication.service.js.map