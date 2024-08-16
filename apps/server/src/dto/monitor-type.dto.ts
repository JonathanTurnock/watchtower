import { ApiProperty } from "@nestjs/swagger";
import { Monitor } from "../monitors/monitor";

export class MonitorTypeDto {
	@ApiProperty()
	id: string;

	@ApiProperty()
	name: string;

	@ApiProperty()
	description: string;

	static fromMonitorType(entity: Monitor): MonitorTypeDto {
		return {
			id: entity.id,
			name: entity.name,
			description: entity.description,
		};
	}
}
