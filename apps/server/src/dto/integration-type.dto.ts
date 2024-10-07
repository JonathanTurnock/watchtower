import { ApiProperty } from "@nestjs/swagger";
import { Integration } from "../integrations/integration";

export class IntegrationTypeDto {
	@ApiProperty()
	id: string;

	@ApiProperty()
	name: string;

	@ApiProperty()
	description: string;

	static fromIntegrationType(entity: Integration): IntegrationTypeDto {
		return {
			id: entity.id,
			name: entity.name,
			description: entity.description,
		};
	}
}
