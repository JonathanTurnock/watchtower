import { z } from "zod";

export const httpSchema = z
	.object({
		url: z.string().url().describe("The URL to check"),
		method: z
			.enum(["GET", "POST", "PUT", "DELETE", "HEAD"])
			.default("HEAD")
			.describe(
				"The HTTP method to use, recommend HEAD for monitoring checks as it is less resource intensive",
			),
		timeout: z
			.number()
			.min(1)
			.default(5000)
			.describe("The timeout in milliseconds"),
		statusCodes: z
			.array(z.enum(["2xx", "3xx", "4xx", "5xx"]))
			.default(["2xx"])
			.describe("The status codes to check for, e.g. '2xx' or '3xx'"),
	})
	.describe("Check the status of a HTTP[S] URL");

export type HttpMonitorConfig = z.infer<typeof httpSchema>;
