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
	MonitorCreateDto,
	MonitorDto,
	MonitorUpdateDto,
} from "../dto/monitor.dto";
import { MonitorService } from "../services/monitor.service";

@Controller("/api/monitors")
export class MonitorController {
	@Inject(MonitorService)
	monitorService: MonitorService;

	@Get("/")
	@ApiOkResponse({
		type: [MonitorDto],
	})
	async getMonitors(): Promise<MonitorDto[]> {
		const entities = await this.monitorService.getMonitors();
		return entities.map(MonitorDto.fromEntity);
	}

	@Get("/:id")
	@ApiOkResponse({ type: MonitorDto })
	@ApiNotFoundResponse({ type: ErrorDto })
	@ApiParam({ name: "id", type: Number })
	async getMonitor(@Param("id") id: number): Promise<MonitorDto> {
		const monitor = await this.monitorService.getMonitor(id);
		if (!monitor)
			throw new NotFoundException(`Monitor with id ${id} was not found`);
		return MonitorDto.fromEntity(monitor);
	}

	@Post("/")
	@ApiOkResponse({ type: MonitorDto })
	@ApiBody({ type: MonitorCreateDto })
	async addMonitor(@Body() monitor: MonitorCreateDto): Promise<MonitorDto> {
		const entity = await this.monitorService.addMonitor(
			monitor.name,
			monitor.type,
		);
		return MonitorDto.fromEntity(entity);
	}

	@Patch("/:id")
	@ApiOkResponse({ type: MonitorDto })
	@ApiNotFoundResponse({ type: ErrorDto })
	@ApiBody({ type: MonitorUpdateDto })
	async updateMonitor(
		@Param("id") id: number,
		@Body() update: MonitorUpdateDto,
	): Promise<MonitorDto> {
		const monitor = await this.monitorService.updateMonitor(
			id,
			update.name,
			update.interval,
			update.integrations,
		);
		if (!monitor)
			throw new NotFoundException(`Monitor with id ${id} was not found`);
		return MonitorDto.fromEntity(monitor);
	}

	@Delete("/:id")
	@ApiOkResponse({ type: MonitorDto })
	@ApiNotFoundResponse({ type: ErrorDto })
	@ApiParam({ name: "id", type: Number })
	async deleteMonitor(@Param("id") id: number): Promise<MonitorDto> {
		const monitor = await this.monitorService.deleteMonitor(id);
		if (!monitor)
			throw new NotFoundException(`Monitor with id ${id} was not found`);
		return MonitorDto.fromEntity(monitor);
	}
}
