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
import { MonitorConfigService } from "../services/monitor-config.service";

@Controller("/api/monitors/:id/config")
export class MonitorConfigController {
	@Inject(MonitorConfigService)
	monitorConfigService: MonitorConfigService;

	@Get("/")
	@ApiOkResponse({
		type: Object,
	})
	@ApiParam({ name: "id", type: Number })
	async getMonitorConfig(@Param("id") id: number): Promise<Object> {
		const config = await this.monitorConfigService.getMonitorConfig(id);
		if (!config)
			throw new NotFoundException(`Monitor with id ${id} was not found`);

		return config;
	}

	@Put("/")
	@ApiOkResponse({
		type: Object,
	})
	@ApiParam({ name: "id", type: Number })
	@ApiBody({ type: Object })
	async updateMonitorConfig(
		@Param("id") id: number,
		@Body() monitorConfig: Object,
	): Promise<Object> {
		const config = await this.monitorConfigService.updateMonitorConfig(
			id,
			monitorConfig,
		);

		if (!config)
			throw new NotFoundException(`Monitor with id ${id} was not found`);

		return config;
	}
}
