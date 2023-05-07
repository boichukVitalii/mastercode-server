"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_VERIFICATION_ERROR = exports.EMAIL_ALREADY_CONFIRMED = exports.NO_USER_WITH_SUCH_ID = exports.NO_USER_WITH_SUCH_EMAIL = void 0;
const NO_USER_WITH_SUCH_EMAIL = (email) => `No user found with email ${email}`;
exports.NO_USER_WITH_SUCH_EMAIL = NO_USER_WITH_SUCH_EMAIL;
exports.NO_USER_WITH_SUCH_ID = 'No user found with such ID';
exports.EMAIL_ALREADY_CONFIRMED = 'Email is already confirmed';
exports.TOKEN_VERIFICATION_ERROR = 'Token verification error';
//# sourceMappingURL=email.constants.js.map