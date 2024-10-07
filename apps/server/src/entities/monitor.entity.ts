import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { IntegrationEntity } from "./integration.entity";

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

	@ManyToMany(() => IntegrationEntity, { eager: true, cascade: true })
	@JoinTable({
		name: "monitor_integrations",
		joinColumn: {
			name: "monitor",
			referencedColumnName: "id",
		},
		inverseJoinColumn: {
			name: "integration",
			referencedColumnName: "id",
		},
	})
	integrations: IntegrationEntity[];

	@Column({ default: 60 })
	interval: number;

	@Column({ default: 604800 }) // 7 Days
	retention: number;
}
