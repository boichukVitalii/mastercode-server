import { join } from 'node:path';
import { config } from 'dotenv-safe';
import { Level } from 'pino';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { DataSource } from 'typeorm';

config({
	allowEmptyValues: true,
	path: join(process.cwd(), '.env'),
	sample: join(process.cwd(), '.env.example'),
});

const migrationsDir = join(process.cwd(), `migrations/*{.ts,.js}`);
const dbConfig: PostgresConnectionOptions = {
	type: 'postgres',
	logging: false,
	url: process.env.DB_URL,
	entities: [join(__dirname, `/**/**.entity{.ts,.js}`)],
	extra: {
		application_name: 'mastercode',
	},
	migrationsRun: true,
	migrationsTableName: 'migrations',
	migrations: [migrationsDir],
	synchronize: true,
};

const redisCacheConfig = {
	host: process.env.REDIS_HOST,
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	port: parseInt(process.env.REDIS_PORT!, 10),
};

const uploadsPath = join(process.cwd(), 'uploads');

export const dataSource = new DataSource(dbConfig);
export default {
	logLevel: process.env.LOG_LEVEL as Level,
	env: process.env.ENV_NAME,
	dbConfig,
	redisCacheConfig,
	dataSourceInit: dataSource.initialize(),
	accessSecret: process.env.JWT_ACCESS_SECRET,
	refreshSecret: process.env.JWT_REFRESH_SECRET,
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	accessExpire: parseInt(process.env.JWT_ACCESS_EXPIRE!, 10),
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	refreshExpire: parseInt(process.env.JWT_REFRESH_EXPIRE!, 10),
	emailHost: process.env.EMAIL_HOST,
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	emailPort: parseInt(process.env.EMAIL_PORT!, 10),
	emailUser: process.env.EMAIL_USER,
	emailPassword: process.env.EMAIL_PASSWORD,
	emailFrom: process.env.EMAIL_FROM,
	verificationSecret: process.env.JWT_VERIFICATION_SECRET,
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	verificationExpire: parseInt(process.env.JWT_VERIFICATION_EXPIRE!, 10),
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
