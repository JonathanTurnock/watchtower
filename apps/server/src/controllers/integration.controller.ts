import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	NotFoundException,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import {
	ApiBody,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiParam,
} from "@nestjs/swagger";
import { ErrorDto } from "../dto/error.dto";
import {
	IntegrationCreateDto,
	IntegrationDto,
	IntegrationUpdateDto,
} from "../dto/integration.dto";
import { IntegrationService } from "../services/integration.service";

@Controller("/api/integrations")
export class IntegrationController {
	@Inject(IntegrationService)
	integrationService: IntegrationService;

	@Get("/")
	@ApiOkResponse({
		type: [IntegrationDto],
	})
	async getIntegrations(): Promise<IntegrationDto[]> {
		const entities = await this.integrationService.getIntegrations();
		return entities.map(IntegrationDto.fromEntity);
	}

	@Get("/:id")
	@ApiOkResponse({ type: IntegrationDto })
	@ApiNotFoundResponse({ type: ErrorDto })
	@ApiParam({ name: "id", type: Number })
	async getIntegration(@Param("id") id: number): Promise<IntegrationDto> {
		const integration = await this.integrationService.getIntegration(id);
		if (!integration)
			throw new NotFoundException(`Integration with id ${id} was not found`);
		return IntegrationDto.fromEntity(integration);
	}

	@Post("/")
	@ApiOkResponse({ type: IntegrationDto })
	@ApiBody({ type: IntegrationCreateDto })
	async addIntegration(
		@Body() integration: IntegrationCreateDto,
	): Promise<IntegrationDto> {
		const entity = await this.integrationService.addIntegration(
			integration.name,
			integration.type,
		);
		return IntegrationDto.fromEntity(entity);
	}

	@Patch("/:id")
	@ApiOkResponse({ type: IntegrationDto })
	@ApiNotFoundResponse({ type: ErrorDto })
	@ApiBody({ type: IntegrationUpdateDto })
	async updateIntegration(
		@Param("id") id: number,
		@Body() update: IntegrationUpdateDto,
	): Promise<IntegrationDto> {
		const integration = await this.integrationService.updateIntegration(
			id,
			update.name,
		);
		if (!integration)
			throw new NotFoundException(`Integration with id ${id} was not found`);
		return IntegrationDto.fromEntity(integration);
	}

	@Delete("/:id")
	@ApiOkResponse({ type: IntegrationDto })
	@ApiNotFoundResponse({ type: ErrorDto })
	@ApiParam({ name: "id", type: Number })
	async deleteIntegration(@Param("id") id: number): Promise<IntegrationDto> {
		const integration = await this.integrationService.deleteIntegration(id);
		if (!integration)
			throw new NotFoundException(`Integration with id ${id} was not found`);
		return IntegrationDto.fromEntity(integration);
	}
}
