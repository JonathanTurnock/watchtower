import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Inject,
	Logger,
	Param,
	Post,
	Req,
} from "@nestjs/common";
import { ApiBody, ApiOkResponse } from "@nestjs/swagger";
// @ts-ignore
import { JSONSchemaMarkdown } from "json-schema-md-doc";
import { ZodError } from "zod";
import { IntegrationTypeDto } from "../dto/integration-type.dto";
import { IntegrationTypeService } from "../services/integration-type.service";

@Controller("/api/integration-types")
export class IntegrationTypeController {
	private readonly logger = new Logger(IntegrationTypeController.name);

	@Inject()
	private readonly integrationTypeService: IntegrationTypeService;

	@Get()
	@ApiOkResponse({ type: [IntegrationTypeDto] })
	getIntegrationTypes(): IntegrationTypeDto[] {
		return this.integrationTypeService
			.getIntegrationTypes()
			.map(IntegrationTypeDto.fromIntegrationType);
	}

	@Get("/:id")
	getSchema(@Param("id") id: string, @Req() req: Request) {
		return {
			$id: req.url,
			...this.integrationTypeService.getJsonSchema(id),
		};
	}

	@Get("/:id/docs")
	@ApiOkResponse({ type: String })
	getSchemaDocs(@Param("id") id: string): string {
		const docMaker = new JSONSchemaMarkdown();
		docMaker.load(this.integrationTypeService.getJsonSchema(id));
		return docMaker.generate();
	}

	@Post("/:id/validate")
	@ApiBody({ type: Object })
	validateSchema(@Param("id") id: string, @Body() config: any) {
		try {
			return this.integrationTypeService.validateConfig(id, config);
		} catch (e) {
			if (e instanceof ZodError) {
				throw new BadRequestException(e.issues);
			}
			throw e;
		}
	}
}
