import { HealthCheckService, HttpHealthIndicator, HealthCheckResult, TypeOrmHealthIndicator } from '@nestjs/terminus';
export declare class HealthController {
    private health;
    private http;
    private db;
    constructor(health: HealthCheckService, http: HttpHealthIndicator, db: TypeOrmHealthIndicator);
    check(): Promise<HealthCheckResult>;
}
