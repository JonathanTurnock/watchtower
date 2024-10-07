import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { IntegrationEntity } from "../entities/integration.entity";
import { MonitorEntity } from "../entities/monitor.entity";

@Injectable()
export class MonitorService {
	private readonly logger = new Logger(MonitorService.name);

	@InjectRepository(MonitorEntity)
	monitorRepo: Repository<MonitorEntity>;

	@InjectRepository(IntegrationEntity)
	integrationRepo: Repository<IntegrationEntity>;

	getMonitors(): Promise<MonitorEntity[]> {
		this.logger.debug("Getting all monitors");
		return this.monitorRepo.find();
	}

	async getMonitor(id: number): Promise<MonitorEntity | undefined> {
		this.logger.debug(`Getting monitor with id ${id}`);
		const monitor = await this.monitorRepo.findOneBy({ id });
		if (!monitor) return undefined;

		return monitor;
	}

	addMonitor(name: string, type: string): Promise<MonitorEntity> {
		this.logger.debug(`Adding monitor with name ${name} with type ${type}`);
		const monitor = this.monitorRepo.create({
			name,
			type,
		});
		return this.monitorRepo.save(monitor);
	}

	async updateMonitor(
		id: number,
		name: string,
		interval: number,
		integrations: number[],
	): Promise<MonitorEntity | undefined> {
		this.logger.debug(
			`Updating monitor with id ${id}, name ${name}, interval ${interval} and integrations ${integrations}`,
		);
		const monitor = await this.monitorRepo.findOneBy({ id });
		if (!monitor) return undefined;

		const _integrations = await this.integrationRepo.findBy({
			id: In(integrations),
		});

		this.logger.debug(
			`Updating monitor with integrations ${JSON.stringify(_integrations)}`,
		);

		monitor.name = name;
		monitor.interval = interval;
		monitor.integrations = _integrations;

		return this.monitorRepo.save(monitor);
	}

	async deleteMonitor(id: number): Promise<MonitorEntity | undefined> {
		this.logger.debug(`Deleting monitor with id ${id}`);
		const monitor = await this.monitorRepo.findOneBy({ id });
		if (!monitor) return undefined;
		await this.monitorRepo.remove(monitor);
		return monitor;
	}
}
