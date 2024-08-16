import { DnsMonitor } from "./dns/dns.monitor";
import { HttpMonitor } from "./http/http.monitor";
import { PortMonitor } from "./port/port.monitor";

export const monitorTypes = [HttpMonitor, DnsMonitor, PortMonitor];
