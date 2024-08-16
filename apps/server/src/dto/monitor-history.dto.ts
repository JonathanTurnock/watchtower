import { ApiProperty } from "@nestjs/swagger";

export class MonitorHistoryDto {
	@ApiProperty()
	id: number;

	@ApiProperty()
	startedAt: number;

	@ApiProperty()
	finishedAt: number;

	@ApiProperty()
	success: boolean;

	static fromEntity(entity: any): MonitorHistoryDto {
		return {
			id: entity.id,
			startedAt: entity.startedAt,
			finishedAt: entity.finishedAt,
			success: entity.success,
		};
	}
}
