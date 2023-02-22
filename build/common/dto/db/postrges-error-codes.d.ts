export declare const PostgresErrCodes: {
    readonly UNIQUE_VIOLETION: "23505";
    readonly FK_VIOLETION: "23503";
};
export declare type TPrismaErrCodes = typeof PostgresErrCodes[keyof typeof PostgresErrCodes];
