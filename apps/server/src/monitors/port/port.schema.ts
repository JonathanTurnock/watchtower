import { z } from "zod";

export const portSchema = z
	.object({
		hostname: z.string().describe("The Hostname to check"),
		port: z.number().describe("The port to check"),
		timeout: z
			.number()
			.default(2500)
			.describe("Timeout in milliseconds, default: 2500"),
	})
	.describe("Check if a port is open on a hostname");

export type PortMonitorConfig = z.infer<typeof portSchema>;
