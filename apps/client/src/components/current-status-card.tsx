import { Card, Stack, Text, Title } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { MonitorDto } from "@watchtower/api-client";
import { FC } from "react";
import { ViewportBreakpoint } from "../viewport-breakpoint.ts";
import { HistoryItem } from "./monitor-history.tsx";
import { MonitorStatusBadge } from "./monitor-status-badge.tsx";

export const CurrentStatusCard: FC<{
	monitor: MonitorDto;
	history: Array<HistoryItem>;
}> = ({ monitor, history }) => {
	const { width } = useViewportSize();

	return (
		<Card>
			<Stack>
				<Title order={3}>Current Status</Title>
				<MonitorStatusBadge
					size={width > ViewportBreakpoint.sm ? "xl" : "lg"}
					history={history}
				/>
				<Text>Checking every {monitor.interval}s</Text>
			</Stack>
		</Card>
	);
};
