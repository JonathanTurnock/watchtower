import { Badge, BadgeProps } from "@mantine/core";
import { FC } from "react";
import { useStatusColorResolver } from "../hooks/useStatusColorResolver.ts";
import { useStatusMessageResolver } from "../hooks/useStatusMessageResolver.ts";
import { HistoryItem } from "./monitor-history.tsx";

export const MonitorStatusBadge: FC<{
	size?: BadgeProps["size"];
	history: Array<HistoryItem>;
}> = ({ history, size }) => {
	const isUp = history.slice(-1).pop()?.success;

	const getColor = useStatusColorResolver();
	const getStatus = useStatusMessageResolver();

	return (
		<Badge size={size} color={getColor(isUp)}>
			{getStatus(isUp)}
		</Badge>
	);
};
