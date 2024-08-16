import { Card, Group, Stack, Text } from "@mantine/core";
import { FC } from "react";
import { HistoryItem, MonitorHistory } from "./monitor-history.tsx";
import { MonitorStatusBadge } from "./monitor-status-badge.tsx";

export type MonitorCardProps = {
	onClick: () => void;
	name: string;
	type: string;
	history: Array<HistoryItem>;
};
export const MonitorCard: FC<MonitorCardProps> = ({
	name,
	type,
	history,
	onClick,
}) => {
	return (
		<Card>
			<Group justify={"space-between"}>
				<Group>
					<MonitorStatusBadge history={history} />
					<Stack gap={0}>
						<Text fw={"bold"} onClick={onClick} style={{ cursor: "pointer" }}>
							{name}
						</Text>
						<Text size={"xs"} c={"dimmed"}>
							{type}
						</Text>
					</Stack>
				</Group>

				<Group visibleFrom={"md"}>
					<MonitorHistory history={history} />
				</Group>
			</Group>
		</Card>
	);
};
