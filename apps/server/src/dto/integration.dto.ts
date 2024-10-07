import { ApiProperty } from "@nestjs/swagger";
import { IntegrationEntity } from "../entities/integration.entity";

export class IntegrationCreateDto {
	@ApiProperty()
	name: string;

	@ApiProperty()
	type: string;
}

export class IntegrationDto extends IntegrationCreateDto {
	@ApiProperty()
	id: number;

	static fromEntity(entity: IntegrationEntity): IntegrationDto {
		return {
			id: entity.id,
			name: entity.name,
			type: entity.type,
		};
	}
}

export class IntegrationUpdateDto {
	@ApiProperty({ required: false })
	name?: string;
}
