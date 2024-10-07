import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { DiscoveryService } from "@nestjs/core";
import { ZodSchema } from "zod";
import { JsonSchema7Type, zodToJsonSchema } from "zod-to-json-schema";
import { integrationTypes } from "../integrations";
import { Integration } from "../integrations/integration";

@Injectable()
export class IntegrationTypeService implements OnModuleInit {
	private readonly logger = new Logger(IntegrationTypeService.name);

	private readonly integrations = new Map<string, Integration>();

	@Inject(DiscoveryService)
	private discoveryService: DiscoveryService;

	onModuleInit(): any {
		for (const { instance } of this.discoveryService.getProviders()) {
			if (integrationTypes.find((type) => instance instanceof type)) {
				this.integrations.set(instance.id, instance);
			}
		}
	}

	getIntegrationTypeInstance(id: string) {
		return this.integrations.get(id);
	}

	getIntegrationTypes(): Integration[] {
		return Array.from(this.integrations.values());
	}

	getZodSchema(id: string): ZodSchema {
		return this.integrations.get(id).configSchema;
	}

	getJsonSchema(id: string): JsonSchema7Type {
		return zodToJsonSchema(this.integrations.get(id).configSchema, {
			target: "jsonSchema7",
		});
	}

	validateConfig<T>(id: string, config: T): T {
		return this.getZodSchema(id).parse(config);
	}
}
