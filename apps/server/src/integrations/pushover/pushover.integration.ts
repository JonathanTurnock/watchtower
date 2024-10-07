import { Injectable, Logger } from "@nestjs/common";
import axios from "axios";
import { MonitorEntity } from "../../entities/monitor.entity";
import { MonitorResult } from "../../monitors/monitor";
import { Integration } from "../integration";
import { PushoverIntegrationConfig, pushoverSchema } from "./pushover.schema";

@Injectable()
export class PushoverIntegration
	implements Integration<PushoverIntegrationConfig>
{
	private readonly logger = new Logger(PushoverIntegration.name);

	id = "PUSHOVER";
	name = "Pushover";
	description = "Get notifications on your Android, iPhone, iPad, and Desktop.";
	configSchema = pushoverSchema;

	async notify(
		config: PushoverIntegrationConfig,
		monitor: MonitorEntity,
		monitorResult: MonitorResult,
	): Promise<void> {
		this.logger.debug("Running Notify");
		try {
			await axios.post("https://api.pushover.net/1/messages.json", {
				token: config.apiToken,
				user: config.userKey,
				message: config.message,
				title: config.title,
				priority: config.priority,
				sound: config.sound,
			});
		} catch (e) {
			this.logger.error("Error sending Pushover notification", e);
		}
	}
}
