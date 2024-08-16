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
import { zodToJsonSchema } from "zod-to-json-schema";
import { MonitorTypeDto } from "../dto/monitor-type.dto";
import { MonitorTypeService } from "../services/monitor-type.service";

@Controller("/api/monitor-types")
export class MonitorTypeController {
	private readonly logger = new Logger(MonitorTypeController.name);

	@Inject()
	private readonly monitorTypeService: MonitorTypeService;

	@Get()
	@ApiOkResponse({ type: [MonitorTypeDto] })
	getMonitorTypes(): MonitorTypeDto[] {
		return this.monitorTypeService
			.getMonitorTypes()
			.map(MonitorTypeDto.fromMonitorType);
	}

	@Get("/:id")
	getSchema(@Param("id") id: string, @Req() req: Request) {
		return {
			$id: req.url,
			...this.monitorTypeService.getJsonSchema(id),
		};
	}

	@Get("/:id/docs")
	@ApiOkResponse({ type: String })
	getSchemaDocs(@Param("id") id: string): string {
		const docMaker = new JSONSchemaMarkdown();
		docMaker.load(this.monitorTypeService.getJsonSchema(id));
		return docMaker.generate();
	}

	@Post("/:id/validate")
	@ApiBody({ type: Object })
	validateSchema(@Param("id") id: string, @Body() config: any) {
		try {
			return this.monitorTypeService.validateConfig(id, config);
		} catch (e) {
			if (e instanceof ZodError) {
				throw new BadRequestException(e.issues);
			}
			throw e;
		}
	}
}
