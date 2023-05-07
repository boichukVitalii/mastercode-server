"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToggleReactionResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class ToggleReactionResponseDto {
    constructor(problem) {
        this.likes = problem.likes;
        this.dislikes = problem.dislikes;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { likes: { required: true, type: () => Number }, dislikes: { required: true, type: () => Number } };
    }
}
exports.ToggleReactionResponseDto = ToggleReactionResponseDto;
//# sourceMappingURL=toggle-reaction-response.dto.js.map