"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailConfirmationModule = void 0;
const common_1 = require("@nestjs/common");
const email_confirmation_service_1 = require("./email-confirmation.service");
const email_confirmation_controller_1 = require("./email-confirmation.controller");
const jwt_1 = require("@nestjs/jwt");
const email_module_1 = require("../email/email.module");
const user_module_1 = require("../user/user.module");
let EmailConfirmationModule = class EmailConfirmationModule {
};
EmailConfirmationModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule.register({}), email_module_1.EmailModule, user_module_1.UserModule],
        controllers: [email_confirmation_controller_1.EmailConfirmationController],
        providers: [email_confirmation_service_1.EmailConfirmationService],
        exports: [email_confirmation_service_1.EmailConfirmationService],
    })
], EmailConfirmationModule);
exports.EmailConfirmationModule = EmailConfirmationModule;
//# sourceMappingURL=email-confirmation.module.js.map