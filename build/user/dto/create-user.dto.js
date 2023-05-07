"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { first_name: { required: true, type: () => String }, last_name: { required: true, type: () => String }, email: { required: true, type: () => String }, additional_info: { required: false, type: () => String }, password: { required: true, type: () => String } };
    }
}
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map