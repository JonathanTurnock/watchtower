import { z } from "zod";

export const pushoverSchema = z
	.object({
		userKey: z
			.string()
			.min(1)
			.max(50)
			.describe("The user key for the Pushover account"),
		apiToken: z
			.string()
			.min(1)
			.max(50)
			.describe("The API token for the Pushover application"),
		title: z
			.string()
			.default("Monitor Alert")
			.describe("The title of the Pushover notification"),
		message: z
			.string()
			.default("Monitor alert triggered")
			.describe("The message of the Pushover notification"),
		priority: z
			.enum(["-2", "-1", "0", "1", "2"])
			.default("0")
			.describe("The priority of the Pushover notification"),
		sound: z
			.string()
			.default("pushover")
			.describe("The sound of the Pushover notification"),
	})
	.describe("Send a Pushover notification");

export type PushoverIntegrationConfig = z.infer<typeof pushoverSchema>;
