"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileDto = void 0;
const openapi = require("@nestjs/swagger");
class FileDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { filename: { required: true, type: () => String }, path: { required: true, type: () => String }, mimetype: { required: true, type: () => String } };
    }
}
exports.FileDto = FileDto;
//# sourceMappingURL=file.dto.js.map