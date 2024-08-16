import { Injectable, Logger } from "@nestjs/common";
import axios from "axios";
import { Monitor, MonitorResult } from "../monitor";
import { HttpMonitorConfig, httpSchema } from "./http.schema";

@Injectable()
export class HttpMonitor implements Monitor<HttpMonitorConfig> {
	private readonly logger = new Logger(HttpMonitor.name);

	id = "HTTP";
	name = "HTTP[S]";
	description = "Check the status of a HTTP[S] URL";
	configSchema = httpSchema;

	private statusEnumsToRegex: Record<string, RegExp> = {
		"2xx": /2[0-9]{2}/,
		"3xx": /3[0-9]{2}/,
		"4xx": /4[0-9]{2}/,
		"5xx": /5[0-9]{2}/,
	};

	async check(config: HttpMonitorConfig): Promise<MonitorResult> {
		this.logger.debug("Running Check");
		const result = await axios.request({
			url: config.url,
			method: config.method || "HEAD",
			validateStatus: null,
			timeout: config.timeout,
		});
		if (
			config.statusCodes
				.map((code) => this.statusEnumsToRegex[code])
				.some((it) => it.test(result.status.toFixed()))
		) {
			this.logger.debug("HTTP Status Code matched", result.status);
			return { success: true };
		}

		return { success: false };
	}
}
