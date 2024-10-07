import { dirname } from "node:path";
import { HttpModule } from "@nestjs/axios";
import { Logger, Module } from "@nestjs/common";
import { DiscoveryModule } from "@nestjs/core";
import { ScheduleModule } from "@nestjs/schedule";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TerminusModule } from "@nestjs/terminus";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HealthController } from "./controllers/health.controller";
import { IntegrationConfigController } from "./controllers/integration-config.controller";
import { IntegrationTypeController } from "./controllers/integration-type.controller";
import { IntegrationController } from "./controllers/integration.controller";
import { MonitorConfigController } from "./controllers/monitor-config.controller";
import { MonitorHistoryController } from "./controllers/monitor-history.controller";
import { MonitorTypeController } from "./controllers/monitor-type.controller";
import { MonitorController } from "./controllers/monitor.controller";
import { IntegrationEntity } from "./entities/integration.entity";
import { MonitorCheckEntity } from "./entities/monitor-check.entity";
import { MonitorEntity } from "./entities/monitor.entity";
import { integrationTypes } from "./integrations";
import { monitorTypes } from "./monitors";
import { CheckService } from "./services/check.service";
import { IntegrationConfigService } from "./services/integration-config.service";
import { IntegrationTypeService } from "./services/integration-type.service";
import { IntegrationService } from "./services/integration.service";
import { MonitorConfigService } from "./services/monitor-config.service";
import { MonitorHistoryService } from "./services/monitor-history.service";
import { MonitorTypeService } from "./services/monitor-type.service";
import { MonitorService } from "./services/monitor.service";

const staticRootPath = dirname(
	require.resolve("@watchtower/client/dist/index.html"),
);

Logger.debug(`Serving Static content from ${staticRootPath}`);

@Module({
	imports: [
		DiscoveryModule,
		ServeStaticModule.forRoot({
			rootPath: staticRootPath,
		}),
		TerminusModule,
		HttpModule,
		ScheduleModule.forRoot(),
		TypeOrmModule.forRoot({
			type: "better-sqlite3",
			database: process.env.WC__DATABASE || "./db.sqlite",
			synchronize: true,
			entities: [MonitorEntity, MonitorCheckEntity, IntegrationEntity],
			// Uncomment these lines to enable logging SQL queries
			// logger: 'advanced-console',
			// logging: 'all',
		}),
		TypeOrmModule.forFeature([
			MonitorEntity,
			MonitorCheckEntity,
			IntegrationEntity,
		]),
	],
	controllers: [
		HealthController,
		MonitorController,
		MonitorHistoryController,
		MonitorConfigController,
		MonitorTypeController,
		IntegrationTypeController,
		IntegrationController,
		IntegrationConfigController,
	],
	providers: [
		MonitorService,
		CheckService,
		MonitorHistoryService,
		MonitorConfigService,
		MonitorTypeService,
		IntegrationTypeService,
		IntegrationService,
		IntegrationConfigService,
		...monitorTypes,
		...integrationTypes,
	],
})
export class AppModule {}
