import { ActionIcon, Container, Flex, Stack, TextInput } from "@mantine/core";
import {
	MonitorDto,
	MonitorTypeDto,
	useMonitorControllerGetMonitors,
	useMonitorHistoryControllerGetMonitorHistory,
	useMonitorTypeControllerGetMonitorTypes,
} from "@watchtower/api-client";
import { FC } from "react";
import { TbPlus } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { MonitorCard } from "../components/monitor-card.tsx";
import { openNewMonitorFormModal } from "../functions/openNewMonitorFormModal.tsx";
import { useFuse } from "../hooks/useFuse.ts";

const _MonitorCard: FC<{ monitor: MonitorDto; type?: MonitorTypeDto }> = ({
	monitor,
	type,
}) => {
	const navigate = useNavigate();
	const history = useMonitorHistoryControllerGetMonitorHistory(monitor.id);

	return (
		<MonitorCard
			onClick={() => navigate(`/monitors/${monitor.id}`)}
			name={monitor.name}
			type={type?.name || monitor.type}
			history={
				history.data?.data.map((it) => ({
					...it,
					startedAt: new Date(it.startedAt),
					finishedAt: new Date(it.finishedAt),
				})) || []
			}
		/>
	);
};

export const MonitorsPage: FC = () => {
	const navigate = useNavigate();
	const monitors = useMonitorControllerGetMonitors();
	const monitorTypes = useMonitorTypeControllerGetMonitorTypes();
	const { search, setSearch, results } = useFuse(monitors.data?.data || []);

	return (
		<Container mt={"md"}>
			<Stack>
				<Flex gap={"xs"} align={"center"}>
					<TextInput
						flex="auto"
						placeholder={"Search"}
						value={search}
						onChange={(event) => setSearch(event.currentTarget.value)}
					/>
					<ActionIcon
						onClick={() =>
							openNewMonitorFormModal(monitorTypes.data?.data || [], navigate)
						}
						size={"lg"}
					>
						<TbPlus />
					</ActionIcon>
				</Flex>
				{results.map((monitor) => (
					<_MonitorCard
						key={monitor.id}
						monitor={monitor}
						type={monitorTypes.data?.data.find((it) => it.id === monitor.type)}
					/>
				))}
			</Stack>
		</Container>
	);
};
