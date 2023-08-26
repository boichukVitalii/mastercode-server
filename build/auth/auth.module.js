"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const strategies_1 = require("./strategies");
const jwt_1 = require("@nestjs/jwt");
const user_module_1 = require("../user/user.module");
const email_confirmation_module_1 = require("../email-confirmation/email-confirmation.module");
const email_module_1 = require("../email/email.module");
const typeorm_1 = require("@nestjs/typeorm");
const password_reset_token_entity_1 = require("./entities/password-reset-token.entity");
const google_authentication_service_1 = require("./social/google-authentication.service");
const hashing_service_1 = require("./hashing/hashing.service");
const bcrypt_service_1 = require("./hashing/bcrypt.service");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({}),
            user_module_1.UserModule,
            email_confirmation_module_1.EmailConfirmationModule,
            email_module_1.EmailModule,
            typeorm_1.TypeOrmModule.forFeature([password_reset_token_entity_1.PasswordResetToken]),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            strategies_1.AccessTokenStrategy,
            strategies_1.RefreshTokenStrategy,
            google_authentication_service_1.GoogleAuthService,
            {
                provide: hashing_service_1.HashingService,
                useClass: bcrypt_service_1.BcryptService,
            },
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map