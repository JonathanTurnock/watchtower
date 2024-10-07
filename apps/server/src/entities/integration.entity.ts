import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "integrations" })
export class IntegrationEntity<CONFIG = any> {
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
}
