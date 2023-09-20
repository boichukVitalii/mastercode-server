"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const node_path_1 = require("node:path");
const dotenv_safe_1 = require("dotenv-safe");
const typeorm_1 = require("typeorm");
(0, dotenv_safe_1.config)({
    allowEmptyValues: true,
    path: (0, node_path_1.join)(process.cwd(), '.env'),
    sample: (0, node_path_1.join)(process.cwd(), '.env.example'),
});
const migrationsDir = (0, node_path_1.join)(process.cwd(), `migrations/*{.ts,.js}`);
const dbConfig = {
    type: 'postgres',
    logging: false,
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
const dbTestConfig = {
    type: 'postgres',
    url: process.env.DB_TEST_URL,
    entities: [(0, node_path_1.join)(__dirname, `/**/**.entity{.ts,.js}`)],
    migrationsRun: true,
    migrationsTableName: 'migrations',
    migrations: [migrationsDir],
    synchronize: true,
};
const redisCacheConfig = {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_CACHE_PORT, 10),
};
const redisQueueConfig = {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_QUEUE_PORT, 10),
};
const uploadsPath = (0, node_path_1.join)(process.cwd(), 'uploads');
exports.dataSource = new typeorm_1.DataSource(dbConfig);
exports.default = {
    logLevel: process.env.LOG_LEVEL,
    env: process.env.ENV_NAME,
    dbConfig,
    dbTestConfig,
    redisCacheConfig,
    redisQueueConfig,
    dataSourceInit: exports.dataSource.initialize(),
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpire: parseInt(process.env.JWT_ACCESS_EXPIRE, 10),
    refreshExpire: parseInt(process.env.JWT_REFRESH_EXPIRE, 10),
    emailHost: process.env.EMAIL_HOST,
    emailPort: parseInt(process.env.EMAIL_PORT, 10),
    emailUser: process.env.EMAIL_USER,
    emailPassword: process.env.EMAIL_PASSWORD,
    emailFrom: process.env.EMAIL_FROM,
    verificationSecret: process.env.JWT_VERIFICATION_SECRET,
    verificationExpire: parseInt(process.env.JWT_VERIFICATION_EXPIRE, 10),
    emailConfirmationUrl: process.env.EMAIL_CONFIRMATION_URL,
    emailResetPasswordUrl: process.env.EMAIL_RESET_PASSWORD_URL,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    applicationName: 'mastercode',
    version: process.env.VERSION || 'latest',
    http: {
        port: process.env.HTTP_PORT || 5000,
    },
    uploadsPath,
};
//# sourceMappingURL=config.js.map