"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createdUserStub = exports.createUserStub = void 0;
const node_crypto_1 = require("node:crypto");
const createUserStub = () => {
    return {
        first_name: 'Ben',
        last_name: 'Drinkwater',
        email: 'example@gmail.com',
        password_hash: '$2y$10$lpijXA4pH5jXcNG1qahBBuEe/cfnSg9Z.bJNUYaKik.wh89jiJpvG',
    };
};
exports.createUserStub = createUserStub;
const createdUserStub = () => {
    return {
        id: (0, node_crypto_1.randomUUID)(),
        first_name: 'Ben',
        last_name: 'Drinkwater',
        avatar_id: null,
        additional_info: null,
        email: 'example@gmail.com',
        password_hash: '$2y$10$lpijXA4pH5jXcNG1qahBBuEe/cfnSg9Z.bJNUYaKik.wh89jiJpvG',
        roles: ['user'],
        is_email_confirmed: false,
        comments: [],
        password_reset_tokens: [],
        problems_reactions: [],
        solved_problems: [],
        created_at: new Date(),
        updated_at: new Date(),
    };
};
exports.createdUserStub = createdUserStub;
//# sourceMappingURL=user.stub.js.map