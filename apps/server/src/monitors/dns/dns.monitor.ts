import { Resolver } from "node:dns/promises";
import { Injectable, Logger } from "@nestjs/common";
import { Monitor, MonitorResult } from "../monitor";
import { DnsMonitorConfig, dnsSchema } from "./dns.schema";

@Injectable()
export class DnsMonitor implements Monitor<DnsMonitorConfig> {
	private readonly logger = new Logger(DnsMonitor.name);

	id = "DNS";
	name = "DNS";
	description =
		"Check the status of a DNS server by attempting to resolve a domain";
	configSchema = dnsSchema;

	async check(config: DnsMonitorConfig): Promise<MonitorResult> {
		this.logger.debug("Running Check");
		const resolver = new Resolver({
			timeout: config.timeout,
			tries: config.tries,
		});

		if (config.resolvers && config.resolvers.length > 0) {
			this.logger.debug("Setting custom resolvers", config.resolvers);
			resolver.setServers(config.resolvers);
		} else {
			this.logger.debug("Using system resolvers");
		}

		const result = await resolver.resolve(
			config.hostname,
			config.recordType || "ANY",
		);

		if (result) {
			this.logger.debug("DNS Record resolved successfully", result);
			return { success: true };
		}

		return { success: false };
	}
}
