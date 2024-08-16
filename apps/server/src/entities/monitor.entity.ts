import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "monitors" })
export class MonitorEntity<CONFIG = any> {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	type: string;

	@Column({
		nullable: true,
		type: "json",
		transformer: {
			to(value: any): any {
				return JSON.stringify(value);
			},
			from(value: any): any {
				return JSON.parse(value);
			},
		},
	})
	config: CONFIG;

	@Column({ default: 60 })
	interval: number;

	@Column({ default: 604800 }) // 7 Days
	retention: number;
}
