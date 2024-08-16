import { z } from "zod";

export const httpSchema = z.object({
	url: z.string(),
	timeout: z.number().min(1).default(30),
	statusCodes: z.array(z.enum(["2xx", "3xx", "4xx", "5xx"])).default(["2xx"]),
});
