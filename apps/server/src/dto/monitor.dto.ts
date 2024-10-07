import { ApiProperty } from "@nestjs/swagger";
import { MonitorEntity } from "../entities/monitor.entity";

export class MonitorCreateDto {
	@ApiProperty()
	name: string;

	@ApiProperty()
	type: string;
}

export class MonitorDto extends MonitorCreateDto {
	@ApiProperty()
	id: number;

	@ApiProperty()
	interval: number;

	@ApiProperty({ required: false, type: [Number] })
	integrations?: number[];

	static fromEntity(entity: MonitorEntity): MonitorDto {
		return {
			id: entity.id,
			name: entity.name,
			type: entity.type,
			interval: entity.interval,
			integrations: entity.integrations?.map((i) => i.id) || [],
		};
	}
}

export class MonitorUpdateDto {
	@ApiProperty({ required: false })
	name?: string;

	@ApiProperty({ required: false })
	interval?: number;

	@ApiProperty({ required: false, type: [Number] })
	integrations?: number[];
}
