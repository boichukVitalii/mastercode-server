"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrentUserId = void 0;
const common_1 = require("@nestjs/common");
exports.GetCurrentUserId = (0, common_1.createParamDecorator)((_, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user['sub'];
});
//# sourceMappingURL=get-current-userId.decorator.js.map