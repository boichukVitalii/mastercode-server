"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const signup_local_dto_1 = require("../../auth/dto/signup-local.dto");
class UpdateUserDto extends (0, swagger_1.PartialType)(signup_local_dto_1.SignupLocalDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return { refresh_token_hash: { required: false, type: () => String } };
    }
}
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=update-user.dto.js.map