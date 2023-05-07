"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerConflictError = exports.InvalidTokenError = exports.EmailNotConfirmedError = exports.EntityNotFoundCustomError = exports.WrongCredentialsError = void 0;
const WRONG_CREDENTIALS_ERROR_MSG = 'Wrong credentials were provided';
class WrongCredentialsError extends Error {
    constructor(providedMessage) {
        const message = providedMessage ? providedMessage : WRONG_CREDENTIALS_ERROR_MSG;
        super(message);
    }
}
exports.WrongCredentialsError = WrongCredentialsError;
const ENTITY_NOT_FOUND_ERROR_MSG = 'Entity was not found';
class EntityNotFoundCustomError extends Error {
    constructor(providedMessage) {
        const message = providedMessage ? providedMessage : ENTITY_NOT_FOUND_ERROR_MSG;
        super(message);
    }
}
exports.EntityNotFoundCustomError = EntityNotFoundCustomError;
const EMAIL_NOT_CONFIRMED_ERROR_MSG = 'Please confirm your email address';
class EmailNotConfirmedError extends Error {
    constructor(providedMessage) {
        const message = providedMessage ? providedMessage : EMAIL_NOT_CONFIRMED_ERROR_MSG;
        super(message);
    }
}
exports.EmailNotConfirmedError = EmailNotConfirmedError;
class InvalidTokenError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.InvalidTokenError = InvalidTokenError;
class ServerConflictError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.ServerConflictError = ServerConflictError;
//# sourceMappingURL=custom-errors.js.map