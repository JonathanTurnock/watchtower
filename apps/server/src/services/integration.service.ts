import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IntegrationEntity } from "../entities/integration.entity";
import { MonitorEntity } from "../entities/monitor.entity";

@Injectable()
export class IntegrationService {
	private readonly logger = new Logger(IntegrationService.name);

	@InjectRepository(IntegrationEntity)
	integrationRepo: Repository<IntegrationEntity>;

	getIntegrations(): Promise<IntegrationEntity[]> {
		this.logger.debug("Getting all monitors");
		return this.integrationRepo.find({ loadEagerRelations: true });
	}

	async getIntegration(id: number): Promise<IntegrationEntity | undefined> {
		this.logger.debug(`Getting integration with id ${id}`);
		const integration = await this.integrationRepo.findOneBy({ id });
		if (!integration) return undefined;

		return integration;
	}

	addIntegration(name: string, type: string): Promise<IntegrationEntity> {
		this.logger.debug(`Adding integration with name ${name} with type ${type}`);
		const monitor = this.integrationRepo.create({
			name,
			type,
		});
		return this.integrationRepo.save(monitor);
	}

	async updateIntegration(
		id: number,
		name: string,
	): Promise<IntegrationEntity | undefined> {
		this.logger.debug(`Updating integration with id ${id}, name ${name}`);
		const integration = await this.integrationRepo.findOneBy({ id });
		if (!integration) return undefined;
		integration.name = name;
		return this.integrationRepo.save(integration);
	}

	async deleteIntegration(id: number): Promise<IntegrationEntity | undefined> {
		this.logger.debug(`Deleting integration with id ${id}`);
		const integration = await this.integrationRepo.findOneBy({ id });
		if (!integration) return undefined;
		await this.integrationRepo.remove(integration);
		return integration;
	}
}
