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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("../config"));
const custom_errors_1 = require("../errors/custom-errors");
const user_entity_1 = require("../user/entities/user.entity");
const email_service_1 = require("../email/email.service");
const node_crypto_1 = require("node:crypto");
const node_util_1 = require("node:util");
const typeorm_2 = require("@nestjs/typeorm");
const password_reset_token_entity_1 = require("./entities/password-reset-token.entity");
const html_1 = require("../assets/html");
const auth_constants_1 = require("./auth.constants");
const hashing_service_1 = require("./hashing/hashing.service");
let AuthService = class AuthService {
    constructor(userService, jwtService, emailService, hashingService, dataSource, passwordResetTokenRepository) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.emailService = emailService;
        this.hashingService = hashingService;
        this.dataSource = dataSource;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
    }
    async signupLocal(dto) {
        const password_hash = await this.hashingService.hash(dto.password);
        const user = await this.userService.create({ ...dto, password_hash });
        const tokens = await this.getTokens({
            sub: user.id,
            email: user.email,
            roles: user.roles,
            isEmailConfirmed: user.is_email_confirmed,
        });
        await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
        return { user, tokens };
    }
    async signinLocal(dto) {
        const user = await this.userService.findOne({ email: dto.email });
        if (!user || !user.password_hash)
            throw new custom_errors_1.WrongCredentialsError();
        const passwordMatches = await this.hashingService.compare(dto.password, user.password_hash);
        if (!passwordMatches)
            throw new custom_errors_1.WrongCredentialsError();
        if (!user.is_email_confirmed)
            throw new custom_errors_1.EmailNotConfirmedError();
        const tokens = await this.getTokens({
            sub: user.id,
            email: user.email,
            roles: user.roles,
            isEmailConfirmed: user.is_email_confirmed,
        });
        await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
        return { user, tokens };
    }
    async logout(userId) {
        await this.userService.updateMany({ where: { id: userId, refresh_token_hash: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) } }, { refresh_token_hash: null });
    }
    async refreshTokens(userId, refreshToken) {
        const user = await this.userService.findOne({ id: userId });
        if (!user || !user.refresh_token_hash)
            throw new custom_errors_1.WrongCredentialsError();
        const refreshTokenMatches = await this.hashingService.compare(refreshToken, user.refresh_token_hash);
        if (!refreshTokenMatches)
            throw new custom_errors_1.WrongCredentialsError();
        const tokens = await this.getTokens({
            sub: user.id,
            email: user.email,
            roles: user.roles,
            isEmailConfirmed: user.is_email_confirmed,
        });
        await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
        return tokens;
    }
    async generatePasswordResetToken(email) {
        const user = await this.userService.findOne({ email });
        if (!user)
            return;
        const randomBytesPromise = (0, node_util_1.promisify)(node_crypto_1.randomBytes);
        const sizeInBytes = 48;
        const token = (await randomBytesPromise(sizeInBytes)).toString('hex');
        const token_hash = (0, node_crypto_1.createHash)('sha256').update(token).digest('base64url');
        const _15MinInMs = 900000;
        const resetTokenEntity = this.passwordResetTokenRepository.create({
            user,
            token_hash,
            token_expiry: Date.now() + _15MinInMs,
        });
        await this.passwordResetTokenRepository.save(resetTokenEntity);
        const url = `${config_1.default.emailResetPasswordUrl}?token=${token}`;
        const subject = 'Password reset';
        const html = (0, html_1.passwordResetHTML)(url);
        await this.emailService.sendMail({
            from: config_1.default.emailFrom,
            to: email,
            subject,
            html,
        });
    }
    async resetPassword(passwordResetToken, newPassword) {
        const token_hash = (0, node_crypto_1.createHash)('sha256').update(passwordResetToken).digest('base64url');
        const resetTokenEntity = await this.passwordResetTokenRepository.findOneBy({ token_hash });
        if (!resetTokenEntity)
            throw new custom_errors_1.InvalidTokenError(auth_constants_1.INVALID_RESET_TOKEN_ERROR);
        const userId = resetTokenEntity.user.id;
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const allTokensForUser = await queryRunner.manager.findBy(password_reset_token_entity_1.PasswordResetToken, {
                user: { id: userId },
            });
            const matchedRow = allTokensForUser.find((row) => row.token_hash === token_hash);
            if (!matchedRow)
                throw new custom_errors_1.InvalidTokenError(auth_constants_1.INVALID_RESET_TOKEN_ERROR);
            await queryRunner.manager.delete(password_reset_token_entity_1.PasswordResetToken, { user: { id: userId } });
            if (matchedRow.token_expiry < Date.now()) {
                throw new custom_errors_1.InvalidTokenError(auth_constants_1.TOKEN_HAS_EXPIRED_ERROR);
            }
            const password_hash = await this.hashingService.hash(newPassword);
            await queryRunner.manager.update(user_entity_1.User, { id: userId }, { password_hash });
            await queryRunner.commitTransaction();
        }
        catch (e) {
            await queryRunner.rollbackTransaction();
            throw e;
        }
        finally {
            await queryRunner.release();
        }
    }
    async updateRefreshTokenHash(userId, refreshToken) {
        const refresh_token_hash = await this.hashingService.hash(refreshToken);
        await this.userService.updateOne({ id: userId }, { refresh_token_hash });
    }
    async getTokens(payload) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: config_1.default.accessSecret,
                expiresIn: config_1.default.accessExpire,
            }),
            this.jwtService.signAsync(payload, {
                secret: config_1.default.refreshSecret,
                expiresIn: config_1.default.refreshExpire,
            }),
        ]);
        return { accessToken, refreshToken };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(5, (0, typeorm_2.InjectRepository)(password_reset_token_entity_1.PasswordResetToken)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        email_service_1.EmailService,
        hashing_service_1.HashingService,
        typeorm_1.DataSource,
        typeorm_1.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map