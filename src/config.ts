import { join } from 'node:path';

import { config } from 'dotenv-safe';
import { Level } from 'pino';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { DataSource } from 'typeorm';

config({
	allowEmptyValues: true,
	path: join(__dirname, '..', '.env'),
	sample: join(__dirname, '..', '.env.example'),
});

const migrationsDir = join(__dirname, `migrations/*{.ts,.js}`);
const dbConfig: PostgresConnectionOptions = {
	type: 'postgres',
	logging: true,
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

export default {
	logLevel: process.env.LOG_LEVEL as Level,
	env: process.env.ENV_NAME,
	dbConfig,
	dataSource: new DataSource(dbConfig),
	applicationName: 'mastercode',
	version: process.env.VERSION || 'latest',
	http: {
		port: process.env.HTTP_PORT || 5000,
	},
};
