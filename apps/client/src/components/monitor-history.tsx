import { Stack, Text, Tooltip } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { FC, useMemo } from "react";
import { useStatusColorResolver } from "../hooks/useStatusColorResolver.ts";
import { useStatusMessageResolver } from "../hooks/useStatusMessageResolver.ts";

const MonitorHistoryItem: FC<{ history?: HistoryItem }> = ({ history }) => {
	const hover = useHover();
	const getColor = useStatusColorResolver();
	const getStatus = useStatusMessageResolver();

	return (
		<Tooltip
			label={
				<Stack gap={0}>
					<Text size={"sm"} c={"dimmed"}>
						{history?.startedAt.toLocaleString()}
					</Text>
					<Text size={"sm"} fw={"bold"}>
						{getStatus(history?.success)}
					</Text>
				</Stack>
			}
		>
			<div
				ref={hover.ref}
				style={{
					transitionDuration: "150ms",
					marginLeft: hover.hovered ? 1 : 3,
					marginRight: hover.hovered ? 1 : 3,
					width: hover.hovered ? 10 : 6,
					height: hover.hovered ? 30 : 24,
					backgroundColor: getColor(history?.success),
					borderRadius: 5,
				}}
			/>
		</Tooltip>
	);
};

export type HistoryItem = {
	id: number;
	success: boolean;
	startedAt: Date;
	finishedAt: Date;
};
export type MonitorHistoryProps = {
	history: Array<HistoryItem>;
};
export const MonitorHistory: FC<MonitorHistoryProps> = ({ history }) => {
	const paddedHistory: Array<HistoryItem | undefined> = useMemo(
		() => [...new Array(30), ...history].slice(-30),
		[history],
	);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				height: 30,
				alignItems: "center",
			}}
		>
			{paddedHistory.map((history) => (
				<MonitorHistoryItem
					key={history?.id || crypto.randomUUID()}
					history={history}
				/>
			))}
		</div>
	);
};
