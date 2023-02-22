"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = require("node:path");
const dotenv_safe_1 = require("dotenv-safe");
const typeorm_1 = require("typeorm");
(0, dotenv_safe_1.config)({
    allowEmptyValues: true,
    path: (0, node_path_1.join)(__dirname, '..', '.env'),
    sample: (0, node_path_1.join)(__dirname, '..', '.env.example'),
});
const migrationsDir = (0, node_path_1.join)(__dirname, `migrations/*{.ts,.js}`);
const dbConfig = {
    type: 'postgres',
    logging: true,
    url: process.env.DB_URL,
    entities: [(0, node_path_1.join)(__dirname, `/**/**.entity{.ts,.js}`)],
    extra: {
        application_name: 'mastercode',
    },
    migrationsRun: true,
    migrationsTableName: 'migrations',
    migrations: [migrationsDir],
    synchronize: true,
};
exports.default = {
    logLevel: process.env.LOG_LEVEL,
    env: process.env.ENV_NAME,
    dbConfig,
    dataSource: new typeorm_1.DataSource(dbConfig),
    applicationName: 'mastercode',
    version: process.env.VERSION || 'latest',
    http: {
        port: process.env.HTTP_PORT || 5000,
    },
};
//# sourceMappingURL=config.js.map