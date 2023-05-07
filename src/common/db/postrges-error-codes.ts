export const PostgresErrCodes = {
	UNIQUE_VIOLETION: '23505',
	FK_VIOLETION: '23503',
} as const;

export type TPostgresErrCodes = typeof PostgresErrCodes[keyof typeof PostgresErrCodes];
