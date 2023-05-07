const WRONG_CREDENTIALS_ERROR_MSG = 'Wrong credentials were provided';
export class WrongCredentialsError extends Error {
	constructor(providedMessage?: string) {
		const message = providedMessage ? providedMessage : WRONG_CREDENTIALS_ERROR_MSG;
		super(message);
	}
}

const ENTITY_NOT_FOUND_ERROR_MSG = 'Entity was not found';
export class EntityNotFoundCustomError extends Error {
	constructor(providedMessage?: string) {
		const message = providedMessage ? providedMessage : ENTITY_NOT_FOUND_ERROR_MSG;
		super(message);
	}
}

const EMAIL_NOT_CONFIRMED_ERROR_MSG = 'Please confirm your email address';
export class EmailNotConfirmedError extends Error {
	constructor(providedMessage?: string) {
		const message = providedMessage ? providedMessage : EMAIL_NOT_CONFIRMED_ERROR_MSG;
		super(message);
	}
}

export class InvalidTokenError extends Error {
	constructor(message: string) {
		super(message);
	}
}

export class ServerConflictError extends Error {
	constructor(message: string) {
		super(message);
	}
}
