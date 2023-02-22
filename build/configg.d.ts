import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { DataSource } from 'typeorm';
declare const _default: {
    logLevel: import("pino").default.Level;
    env: string | undefined;
    dbConfig: PostgresConnectionOptions;
    dataSource: DataSource;
    applicationName: string;
    version: string;
    http: {
        port: string | number;
    };
};
export default _default;
export declare const hotdog = "hotgod";
