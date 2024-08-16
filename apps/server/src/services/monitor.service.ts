import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MonitorEntity } from "../entities/monitor.entity";

@Injectable()
export class MonitorService {
	private readonly logger = new Logger(MonitorService.name);

	@InjectRepository(MonitorEntity)
	monitorService: Repository<MonitorEntity>;

	getMonitors(): Promise<MonitorEntity[]> {
		this.logger.debug("Getting all monitors");
		return this.monitorService.find();
	}

	async getMonitor(id: number): Promise<MonitorEntity | undefined> {
		this.logger.debug(`Getting monitor with id ${id}`);
		const monitor = await this.monitorService.findOneBy({ id });
		if (!monitor) return undefined;

		return monitor;
	}

	addMonitor(name: string, type: string): Promise<MonitorEntity> {
		this.logger.debug(`Adding monitor with name ${name} with type ${type}`);
		const monitor = this.monitorService.create({
			name,
			type,
		});
		return this.monitorService.save(monitor);
	}

	async updateMonitor(
		id: number,
		name: string,
		interval: number,
	): Promise<MonitorEntity | undefined> {
		this.logger.debug(
			`Updating monitor with id ${id}, name ${name}, interval ${interval}`,
		);
		const monitor = await this.monitorService.findOneBy({ id });
		if (!monitor) return undefined;
		monitor.name = name;
		monitor.interval = interval;
		return this.monitorService.save(monitor);
	}

	async deleteMonitor(id: number): Promise<MonitorEntity | undefined> {
		this.logger.debug(`Deleting monitor with id ${id}`);
		const monitor = await this.monitorService.findOneBy({ id });
		if (!monitor) return undefined;
		await this.monitorService.remove(monitor);
		return monitor;
	}
}
