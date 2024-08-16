import { AreaChart, Sparkline } from "@mantine/charts";
import { Card, Group, Stack, Text, Title } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { differenceInMilliseconds } from "date-fns";
import { max, mean, min } from "lodash";
import ms from "ms";
import { FC, useMemo } from "react";
import { ViewportBreakpoint } from "../viewport-breakpoint.ts";
import { HistoryItem } from "./monitor-history.tsx";
export const DurationCard: FC<{
	history: Array<HistoryItem>;
}> = ({ history }) => {
	const { width } = useViewportSize();

	const historyDurations = useMemo(() => {
		const duration = history.map((it) =>
			differenceInMilliseconds(it.finishedAt, it.startedAt),
		);
		const _min = min(duration);
		const _max = max(duration);
		const _average = mean(duration);

		return {
			min: _min ? ms(+_min.toFixed(0)) : "-",
			max: _max ? ms(+_max.toFixed(0)) : "-",
			average: _average ? ms(+_average.toFixed(0)) : "-",
		};
	}, [history]);

	return (
		<Card>
			<Stack>
				<Group justify={"space-between"}>
					<Title order={3}>Duration</Title>
				</Group>
				{width > ViewportBreakpoint.sm ? (
					<AreaChart
						h={300}
						data={history.map((it) => ({
							...it,
							name: it.startedAt.toLocaleTimeString(),
							duration: differenceInMilliseconds(it.finishedAt, it.startedAt),
						}))}
						series={[{ name: "duration", color: "pink" }]}
						dataKey={"name"}
						yAxisLabel={"Milliseconds"}
					/>
				) : (
					<Sparkline
						h={100}
						color={"pink"}
						data={history.map((it) =>
							differenceInMilliseconds(it.finishedAt, it.startedAt),
						)}
					/>
				)}
				<Group grow justify={"center"}>
					<Stack gap={"xs"} align={"center"}>
						<Text size={"sm"}>{historyDurations.average}</Text>
						<Text fw={"bold"}>Average</Text>
					</Stack>
					<Stack gap={"xs"} align={"center"}>
						<Text size={"sm"}>{historyDurations.min}</Text>
						<Text fw={"bold"}>Min</Text>
					</Stack>
					<Stack gap={"xs"} align={"center"}>
						<Text size={"sm"}>{historyDurations.max}</Text>
						<Text fw={"bold"}>Max</Text>
					</Stack>
				</Group>
			</Stack>
		</Card>
	);
};
