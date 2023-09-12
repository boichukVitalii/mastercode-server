import { Controller, Get } from '@nestjs/common';
import {
	HealthCheckService,
	HttpHealthIndicator,
	HealthCheck,
	HealthCheckResult,
	HealthIndicatorResult,
	TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { Public } from '../blocks/decorators/public.decorator';

@Controller('health')
export class HealthController {
	constructor(
		private health: HealthCheckService,
		private http: HttpHealthIndicator,
		private db: TypeOrmHealthIndicator,
	) {}

	@Get()
	@HealthCheck()
	@Public()
	check(): Promise<HealthCheckResult> {
		return this.health.check([
			(): Promise<HealthIndicatorResult> =>
				this.http.pingCheck('swagger-docs', 'http://localhost:5000/docs'),
			(): Promise<HealthIndicatorResult> => this.db.pingCheck('database'),
		]);
	}
}
