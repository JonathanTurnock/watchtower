import {
	Body,
	Controller,
	Get,
	Inject,
	NotFoundException,
	Param,
	Put,
} from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiParam } from "@nestjs/swagger";
import { IntegrationConfigService } from "../services/integration-config.service";

@Controller("/api/integrations/:id/config")
export class IntegrationConfigController {
	@Inject(IntegrationConfigService)
	integrationConfigService: IntegrationConfigService;

	@Get("/")
	@ApiOkResponse({
		type: Object,
	})
	@ApiParam({ name: "id", type: Number })
	async getIntegrationConfig(@Param("id") id: number): Promise<Object> {
		const config = await this.integrationConfigService.getIntegrationConfig(id);
		if (!config)
			throw new NotFoundException(`Integration with id ${id} was not found`);

		return config;
	}

	@Put("/")
	@ApiOkResponse({
		type: Object,
	})
	@ApiParam({ name: "id", type: Number })
	@ApiBody({ type: Object })
	async updateIntegrationConfig(
		@Param("id") id: number,
		@Body() integrationConfig: Object,
	): Promise<Object> {
		const config = await this.integrationConfigService.updateIntegrationConfig(
			id,
			integrationConfig,
		);

		if (!config)
			throw new NotFoundException(`Integration with id ${id} was not found`);

		return config;
	}
}
