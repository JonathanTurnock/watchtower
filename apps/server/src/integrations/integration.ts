import { ZodSchema, z } from "zod";
import { MonitorEntity } from "../entities/monitor.entity";
import { MonitorResult } from "../monitors/monitor";

export interface Integration<CONFIG = any> {
	id: string;

	name: string;

	description: string;

	configSchema: ZodSchema<CONFIG>;

	notify(
		config: CONFIG,
		monitor: MonitorEntity,
		monitorResult: MonitorResult,
	): Promise<void>;
}
