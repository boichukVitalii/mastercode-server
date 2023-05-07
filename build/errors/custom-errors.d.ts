export declare class WrongCredentialsError extends Error {
    constructor(providedMessage?: string);
}
export declare class EntityNotFoundCustomError extends Error {
    constructor(providedMessage?: string);
}
export declare class EmailNotConfirmedError extends Error {
    constructor(providedMessage?: string);
}
export declare class InvalidTokenError extends Error {
    constructor(message: string);
}
export declare class ServerConflictError extends Error {
    constructor(message: string);
}
