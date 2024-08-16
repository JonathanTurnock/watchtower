import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { MonitorEntity } from "./monitor.entity";

@Entity({ name: "monitor_checks" })
export class MonitorCheckEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => MonitorEntity, { cascade: true, onDelete: "CASCADE" })
	@JoinColumn()
	monitor: MonitorEntity;

	@Column({ type: "datetime" })
	startedAt: number;

	@Column({ type: "datetime", nullable: true })
	finishedAt: number;

	@Column({ nullable: true })
	success: boolean;
}
