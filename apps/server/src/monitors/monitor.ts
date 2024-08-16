import { ZodSchema, z } from "zod";

export const monitorResultSchema = z.object({
	success: z.boolean(),
});

export type MonitorResult = z.infer<typeof monitorResultSchema>;

export interface Monitor<CONFIG = any> {
	id: string;

	name: string;

	description: string;

	configSchema: ZodSchema<CONFIG>;

	check(config: CONFIG): Promise<MonitorResult>;
}
