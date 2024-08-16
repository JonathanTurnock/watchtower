import {
	BadRequestException,
	Inject,
	Injectable,
	Logger,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MonitorEntity } from "../entities/monitor.entity";
import { MonitorTypeService } from "./monitor-type.service";

@Injectable()
export class MonitorConfigService {
	private readonly logger = new Logger(MonitorConfigService.name);

	@InjectRepository(MonitorEntity)
	monitorEntityRepository: Repository<MonitorEntity>;

	@Inject(MonitorTypeService)
	monitorTypeService: MonitorTypeService;

	async getMonitorConfig(id: number): Promise<Object | undefined> {
		this.logger.debug(`Getting monitor config for monitor with id ${id}`);
		const monitor = await this.monitorEntityRepository.findOneBy({ id });
		if (!monitor) return undefined;

		return monitor.config;
	}

	async updateMonitorConfig(
		id: number,
		config: Object,
	): Promise<Object | undefined> {
		this.logger.debug(`Updating monitor config for monitor with id ${id}`);
		const monitor = await this.monitorEntityRepository.findOneBy({ id });
		if (!monitor) return;

		try {
			this.monitorTypeService.validateConfig(monitor.type, config);
		} catch (e) {
			this.logger.error(e);
			throw new BadRequestException(e);
		}

		monitor.config = config;
		const updated = await this.monitorEntityRepository.save(monitor);
		return updated.config;
	}
}
