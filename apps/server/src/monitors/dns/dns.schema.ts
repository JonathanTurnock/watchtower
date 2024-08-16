import { z } from "zod";

export const dnsSchema = z
	.object({
		hostname: z.string().describe("The Hostname to check"),
		resolvers: z
			.array(z.string())
			.describe(
				"The DNS resolver to use, if not provided system resolver will be used",
			)
			.optional(),
		recordType: z
			.enum([
				"A",
				"AAAA",
				"CNAME",
				"MX",
				"NAPTR",
				"NS",
				"PTR",
				"SOA",
				"SRV",
				"TXT",
			])
			.default("A")
			.describe('Resource record type. Default: "A"'),
		timeout: z
			.number()
			.default(2500)
			.optional()
			.describe("Timeout in milliseconds, default: 2500"),
		tries: z
			.number()
			.default(2)
			.optional()
			.describe("Number of tries, default: 2"),
	})
	.describe(
		"Resolve a DNS record, see https://nodejs.org/api/dns.html for more information",
	);

export type DnsMonitorConfig = z.infer<typeof dnsSchema>;
