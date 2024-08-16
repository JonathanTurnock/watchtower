import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { DiscoveryService } from "@nestjs/core";
import { ZodSchema } from "zod";
import { JsonSchema7Type, zodToJsonSchema } from "zod-to-json-schema";
import { monitorTypes } from "../monitors";
import { Monitor } from "../monitors/monitor";

@Injectable()
export class MonitorTypeService implements OnModuleInit {
	private readonly logger = new Logger(MonitorTypeService.name);

	private readonly monitors = new Map<string, Monitor>();

	@Inject(DiscoveryService)
	private discoveryService: DiscoveryService;

	onModuleInit(): any {
		for (const { instance } of this.discoveryService.getProviders()) {
			if (monitorTypes.find((type) => instance instanceof type)) {
				this.monitors.set(instance.id, instance);
			}
		}
	}

	getMonitorTypeInstance(id: string) {
		return this.monitors.get(id);
	}

	getMonitorTypes(): Monitor[] {
		return Array.from(this.monitors.values());
	}

	getZodSchema(id: string): ZodSchema {
		return this.monitors.get(id).configSchema;
	}

	getJsonSchema(id: string): JsonSchema7Type {
		return zodToJsonSchema(this.monitors.get(id).configSchema, {
			target: "jsonSchema7",
		});
	}

	validateConfig<T>(id: string, config: T): T {
		return this.getZodSchema(id).parse(config);
	}
}
