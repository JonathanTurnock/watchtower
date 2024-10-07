import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import _ from "lodash";
import { IsNull, Not, Repository } from "typeorm";
import { MonitorHistoryDto } from "../dto/monitor-history.dto";
import { MonitorCheckEntity } from "../entities/monitor-check.entity";
import { MonitorEntity } from "../entities/monitor.entity";

@Injectable()
export class MonitorHistoryService {
	private readonly logger = new Logger(MonitorHistoryService.name);

	@InjectRepository(MonitorEntity)
	monitorRepo: Repository<MonitorEntity>;

	@InjectRepository(MonitorCheckEntity)
	monitorCheckEntityRepository: Repository<MonitorCheckEntity>;

	async getLast30MonitorHistories(
		id: number,
	): Promise<MonitorHistoryDto[] | undefined> {
		this.logger.debug(`Getting monitor history for monitor with id ${id}`);
		const monitor = await this.monitorRepo.findOneBy({ id });
		if (!monitor) return undefined;

		this.logger.debug(
			`Found monitor with id ${id}, getting history for monitor`,
		);

		const history = await this.monitorCheckEntityRepository.find({
			where: {
				monitor: { id: monitor.id },
				finishedAt: Not(IsNull()),
			},
			order: { id: "DESC" },
			take: 30,
		});

		this.logger.debug(
			`Found ${history.length} items for monitor with id ${id}`,
		);

		return _(history)
			.orderBy("id", ["asc"])
			.map((it) => ({
				id: it.id,
				startedAt: it.startedAt,
				finishedAt: it.finishedAt,
				success: it.success,
			}))
			.valueOf();
	}
}
