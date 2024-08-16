import { Card, Stack, Text, Title } from "@mantine/core";
import { last } from "lodash";
import { FC } from "react";
import { HistoryItem, MonitorHistory } from "./monitor-history.tsx";

export const StatusCard: FC<{
	history: Array<HistoryItem>;
}> = ({ history }) => {
	return (
		<Card>
			<Stack>
				<Title order={3}>Status</Title>
				<MonitorHistory history={history} />
				<Text size={"sm"}>
					Last Checked: {last(history)?.startedAt.toLocaleString() || "Never"}
				</Text>
			</Stack>
		</Card>
	);
};
