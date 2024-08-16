import { dirname } from "node:path";
import { HttpModule } from "@nestjs/axios";
import { Logger, Module } from "@nestjs/common";
import { DiscoveryModule } from "@nestjs/core";
import { ScheduleModule } from "@nestjs/schedule";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TerminusModule } from "@nestjs/terminus";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HealthController } from "./controllers/health.controller";
import { MonitorConfigController } from "./controllers/monitor-config.controller";
import { MonitorHistoryController } from "./controllers/monitor-history.controller";
import { MonitorTypeController } from "./controllers/monitor-type.controller";
import { MonitorController } from "./controllers/monitor.controller";
import { MonitorCheckEntity } from "./entities/monitor-check.entity";
import { MonitorEntity } from "./entities/monitor.entity";
import { monitorTypes } from "./monitors";
import { CheckService } from "./services/check.service";
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
			entities: [MonitorEntity, MonitorCheckEntity],
			// Uncomment these lines to enable logging SQL queries
			// logger: 'advanced-console',
			// logging: 'all',
		}),
		TypeOrmModule.forFeature([MonitorEntity, MonitorCheckEntity]),
	],
	controllers: [
		HealthController,
		MonitorController,
		MonitorHistoryController,
		MonitorConfigController,
		MonitorTypeController,
	],
	providers: [
		MonitorService,
		CheckService,
		MonitorHistoryService,
		MonitorConfigService,
		MonitorTypeService,
		...monitorTypes,
	],
})
export class AppModule {}
