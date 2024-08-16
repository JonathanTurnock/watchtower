import {
	Controller,
	Get,
	Inject,
	NotFoundException,
	Param,
	Query,
} from "@nestjs/common";
import { ApiOkResponse, ApiParam, ApiQuery } from "@nestjs/swagger";
import { MonitorHistoryDto } from "../dto/monitor-history.dto";
import { MonitorHistoryService } from "../services/monitor-history.service";
import { MonitorService } from "../services/monitor.service";

@Controller("/api/monitors/:id/history")
export class MonitorHistoryController {
	@Inject(MonitorService)
	monitorService: MonitorService;

	@Inject(MonitorHistoryService)
	monitorHistoryService: MonitorHistoryService;

	@Get("/")
	@ApiOkResponse({
		type: [MonitorHistoryDto],
	})
	@ApiParam({ name: "id", type: Number })
	async getMonitorHistory(
		@Param("id") id: number,
	): Promise<MonitorHistoryDto[]> {
		const monitor = await this.monitorService.getMonitor(id);
		if (!monitor)
			throw new NotFoundException(`Monitor with id ${id} was not found`);

		const entities =
			await this.monitorHistoryService.getLast30MonitorHistories(id);
		return entities.map(MonitorHistoryDto.fromEntity);
	}
}
