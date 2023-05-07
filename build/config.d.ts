import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { DataSource } from 'typeorm';
export declare const dataSource: DataSource;
declare const _default: {
    logLevel: import("pino").default.Level;
    env: string | undefined;
    dbConfig: PostgresConnectionOptions;
    redisCacheConfig: {
        host: string | undefined;
        port: number;
    };
    dataSourceInit: Promise<DataSource>;
    accessSecret: string | undefined;
    refreshSecret: string | undefined;
    accessExpire: number;
    refreshExpire: number;
    emailHost: string | undefined;
    emailPort: number;
    emailUser: string | undefined;
    emailPassword: string | undefined;
    emailFrom: string | undefined;
    verificationSecret: string | undefined;
    verificationExpire: number;
    emailConfirmationUrl: string | undefined;
    emailResetPasswordUrl: string | undefined;
    googleClientId: string | undefined;
    googleClientSecret: string | undefined;
    applicationName: string;
    version: string;
    http: {
        port: string | number;
    };
    uploadsPath: string;
};
export default _default;
