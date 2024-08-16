import { Socket } from "node:net";
import { Injectable, Logger } from "@nestjs/common";
import { Monitor, MonitorResult } from "../monitor";
import { PortMonitorConfig, portSchema } from "./port.schema";

@Injectable()
export class PortMonitor implements Monitor<PortMonitorConfig> {
	private readonly logger = new Logger(PortMonitor.name);

	id = "PORT";
	name = "Port";
	description = "Check the status of a port by attempting to connect to it";
	configSchema = portSchema;

	async check(config: PortMonitorConfig): Promise<MonitorResult> {
		this.logger.debug("Running Check");

		const isPortOpen = await new Promise<boolean>((resolve) => {
			const socket = new Socket();

			const onError = () => {
				socket.destroy();
				resolve(false);
			};

			const onConnect = () => {
				socket.end();
				resolve(true);
			};

			socket.once("error", onError);
			socket.setTimeout(config.timeout, onError);
			socket.connect(config.port, config.hostname, onConnect);
		});

		return {
			success: isPortOpen,
		};
	}
}
