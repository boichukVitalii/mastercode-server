export declare const PostgresErrCodes: {
    readonly UNIQUE_VIOLETION: "23505";
    readonly FK_VIOLETION: "23503";
};
export type TPostgresErrCodes = typeof PostgresErrCodes[keyof typeof PostgresErrCodes];
