import {
	ActionIcon,
	Container,
	Flex,
	Group,
	Menu,
	Stack,
	Title,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import {
	MonitorDto,
	MonitorHistoryDto,
	useMonitorControllerGetMonitor,
	useMonitorHistoryControllerGetMonitorHistory,
} from "@watchtower/api-client";
import { FC } from "react";
import { TbArrowLeft, TbDotsVertical, TbEdit, TbTrash } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { CurrentStatusCard } from "../components/current-status-card.tsx";
import { DurationCard } from "../components/duration-card.tsx";
import { StatusCard } from "../components/status-card.tsx";
import { deleteMonitor } from "../functions/deleteMonitor.ts";
import { ViewportBreakpoint } from "../viewport-breakpoint.ts";

const _MonitorPage: FC<{
	monitor: MonitorDto;
	history: MonitorHistoryDto[];
}> = ({ monitor, history }) => {
	const { width } = useViewportSize();
	const navigate = useNavigate();
	const historyItems = history.map((it) => ({
		...it,
		startedAt: new Date(it.startedAt),
		finishedAt: new Date(it.finishedAt),
	}));

	return (
		<Stack>
			<Flex align={"center"} justify={"space-between"}>
				<Group>
					<ActionIcon variant={"subtle"} onClick={() => navigate("/monitors")}>
						<TbArrowLeft />
					</ActionIcon>
					<Title order={2}>{monitor.name}</Title>
				</Group>
				<Group>
					<Menu>
						<Menu.Target>
							<ActionIcon variant={"subtle"}>
								<TbDotsVertical />
							</ActionIcon>
						</Menu.Target>
						<Menu.Dropdown>
							<Menu.Item
								leftSection={<TbEdit />}
								onClick={() => navigate("edit")}
							>
								Edit
							</Menu.Item>
							<Menu.Item
								leftSection={<TbTrash />}
								onClick={() => deleteMonitor(monitor.id, navigate)}
							>
								Delete
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Group>
			</Flex>
			{width < ViewportBreakpoint.sm ? (
				<Stack>
					<CurrentStatusCard monitor={monitor} history={historyItems} />
					<StatusCard history={historyItems} />
				</Stack>
			) : (
				<Group grow>
					<CurrentStatusCard monitor={monitor} history={historyItems} />
					<StatusCard history={historyItems} />
				</Group>
			)}
			<DurationCard history={historyItems} />
		</Stack>
	);
};

export const MonitorPage: FC<{}> = ({}) => {
	const { id } = useParams();
	const monitor = useMonitorControllerGetMonitor(Number(id || 0));

	const history = useMonitorHistoryControllerGetMonitorHistory(Number(id || 0));

	return (
		<Container mt={"md"}>
			{monitor.data && (
				<_MonitorPage
					monitor={monitor.data.data}
					history={history.data?.data || []}
				/>
			)}
		</Container>
	);
};
