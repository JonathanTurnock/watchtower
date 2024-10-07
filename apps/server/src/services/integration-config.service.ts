import {
	BadRequestException,
	Inject,
	Injectable,
	Logger,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IntegrationEntity } from "../entities/integration.entity";
import { IntegrationTypeService } from "./integration-type.service";

@Injectable()
export class IntegrationConfigService {
	private readonly logger = new Logger(IntegrationConfigService.name);

	@InjectRepository(IntegrationEntity)
	integrationEntityRepo: Repository<IntegrationEntity>;

	@Inject(IntegrationTypeService)
	integrationTypeService: IntegrationTypeService;

	async getIntegrationConfig(id: number): Promise<Object | undefined> {
		this.logger.debug(
			`Getting integration config for integration with id ${id}`,
		);
		const integration = await this.integrationEntityRepo.findOneBy({ id });
		if (!integration) return undefined;

		return integration.config;
	}

	async updateIntegrationConfig(
		id: number,
		config: Object,
	): Promise<Object | undefined> {
		this.logger.debug(
			`Updating integration config for integration with id ${id}`,
		);
		const integration = await this.integrationEntityRepo.findOneBy({ id });
		if (!integration) return;

		try {
			this.integrationTypeService.validateConfig(integration.type, config);
		} catch (e) {
			this.logger.error(e);
			throw new BadRequestException(e);
		}

		integration.config = config;
		const updated = await this.integrationEntityRepo.save(integration);
		return updated.config;
	}
}
