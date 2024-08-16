import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { differenceInSeconds, subSeconds } from "date-fns";
import { IsNull, LessThan, Not, Repository } from "typeorm";
import { MonitorCheckEntity } from "../entities/monitor-check.entity";
import { MonitorEntity } from "../entities/monitor.entity";
import { MonitorResult, monitorResultSchema } from "../monitors/monitor";
import { MonitorTypeService } from "./monitor-type.service";

@Injectable()
export class CheckService {
	private readonly logger = new Logger(CheckService.name);

	@InjectRepository(MonitorEntity)
	monitorRepository: Repository<MonitorEntity>;

	@InjectRepository(MonitorCheckEntity)
	monitorCheckRepository: Repository<MonitorCheckEntity>;

	@Inject(MonitorTypeService)
	private monitorTypeService: MonitorTypeService;

	@Cron(CronExpression.EVERY_HOUR)
	async purge() {
		this.logger.debug("Purging old monitor checks");
		for (const monitor of await this.monitorRepository.find()) {
			const cutoff = subSeconds(new Date(), monitor.retention);
			await this.monitorCheckRepository.delete({
				startedAt: LessThan(cutoff.valueOf()),
			});
		}
	}

	@Cron(CronExpression.EVERY_MINUTE)
	async check() {
		this.logger.debug("Performing Checks");

		for (const monitor of await this.monitorRepository.find({
			where: { config: Not(IsNull()) },
		})) {
			this.logger.debug(
				`Checking monitor ${monitor.name} with interval ${monitor.interval}`,
			);

			const lastCheck = await this.monitorCheckRepository.findOne({
				where: { monitor: { id: monitor.id } },
				order: { id: "DESC" },
			});

			if (!lastCheck) {
				this.logger.debug("No previous check found, checking now");
				await this.doCheck(monitor);
			} else {
				const secondsSinceLastCheck =
					differenceInSeconds(Date.now(), lastCheck.startedAt) + 1;

				this.logger.debug(
					`Last check was ${secondsSinceLastCheck} seconds ago`,
				);
				if (secondsSinceLastCheck >= monitor.interval) {
					this.logger.debug(
						`Last check was ${secondsSinceLastCheck} seconds ago, checking now`,
					);
					await this.doCheck(monitor);
				}
			}
		}
	}

	async doCheck(monitor: MonitorEntity) {
		this.logger.debug(`Checking monitor ${monitor.name}`);

		const startedAt = Date.now();
		let result: MonitorResult = { success: false };

		const record = await this.monitorCheckRepository.save({
			monitor,
			success: null,
			startedAt,
			finishedAt: null,
		});

		try {
			const parsedConfig = this.monitorTypeService.validateConfig(
				monitor.type,
				monitor.config,
			);
			result = await this.monitorTypeService
				.getMonitorTypeInstance(monitor.type)
				.check(parsedConfig);
			result = monitorResultSchema.parse(result);
		} catch (e) {
			this.logger.error(`Error checking monitor ${monitor.name}`, e);
		}

		const latestRecord = await this.monitorCheckRepository.findOneBy({
			id: record.id,
		});

		latestRecord.success = result.success;
		latestRecord.finishedAt = Date.now();
		await this.monitorCheckRepository.save(latestRecord);
	}
}
