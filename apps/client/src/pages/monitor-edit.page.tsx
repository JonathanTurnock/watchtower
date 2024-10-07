import {
	ActionIcon,
	Container,
	Drawer,
	Group,
	LoadingOverlay,
	Stack,
	Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
	IntegrationDto,
	MonitorDto,
	monitorConfigControllerUpdateMonitorConfig,
	monitorControllerUpdateMonitor,
	useIntegrationControllerGetIntegrations,
	useMonitorConfigControllerGetMonitorConfig,
	useMonitorControllerGetMonitor,
	useMonitorTypeControllerGetSchema,
	useMonitorTypeControllerGetSchemaDocs,
} from "@watchtower/api-client";
import { JSONSchema7 } from "json-schema";
import { FC } from "react";
import { TbArrowLeft } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { SWRHookInfo } from "../components/hook-debugger.tsx";
import { MonitorTypeDocs } from "../components/monitor-type-docs.tsx";
import { SWR_DEBUG } from "../config.ts";
import {
	EditMonitorForm,
	EditMonitorFormValues,
} from "../forms/edit-monitor-form.tsx";
import { showErrorNotification } from "../functions/showErrorNotification.tsx";
import { showSuccessNotification } from "../functions/showSuccessNotification.tsx";

const _MonitorEditPage: FC<{
	monitor: MonitorDto;
	integrations: IntegrationDto[];
	config: any;
	onShowDocs: () => void;
	monitorTypeSchema: JSONSchema7;
	refreshCallback: () => Promise<void>;
}> = ({
	monitor,
	integrations,
	config,
	refreshCallback,
	monitorTypeSchema,
	onShowDocs,
}) => {
	const navigate = useNavigate();

	async function handleSubmit(values: EditMonitorFormValues, config: any) {
		try {
			await monitorConfigControllerUpdateMonitorConfig(monitor.id, config);
			await monitorControllerUpdateMonitor(monitor.id, {
				name: values.name,
				interval: values.interval,
				integrations: values.integrations.map(Number),
			});
			showSuccessNotification({ message: "Monitor updated successfully" });
			await refreshCallback();
		} catch (error) {
			showErrorNotification({
				title: "Error updating monitor",
				error,
			});
		}
	}

	return (
		<Stack>
			<Group>
				<ActionIcon
					variant={"subtle"}
					onClick={() => navigate(`/monitors/${monitor.id}`)}
				>
					<TbArrowLeft />
				</ActionIcon>
				<Title order={2}>Edit {monitor.type} Monitor</Title>
			</Group>
			<EditMonitorForm
				onSubmit={handleSubmit}
				monitorTypeSchema={monitorTypeSchema}
				onShowDocs={onShowDocs}
				initialValues={{
					name: monitor.name,
					interval: monitor.interval,
					integrations: monitor.integrations?.map((it) => it.toString()) || [],
				}}
				integrations={integrations.map((it) => ({
					value: it.id.toString(),
					label: it.name,
				}))}
				initialConfig={config}
			/>
		</Stack>
	);
};

export const MonitorEditPage: FC<{}> = ({}) => {
	const { id } = useParams();

	const monitor = useMonitorControllerGetMonitor(Number(id || 0));
	const config = useMonitorConfigControllerGetMonitorConfig(Number(id || 0));
	const integrations = useIntegrationControllerGetIntegrations();

	const monitorTypeSchema = useMonitorTypeControllerGetSchema(
		monitor.data?.data.type || "",
	);
	const monitorTypeDocs = useMonitorTypeControllerGetSchemaDocs(
		monitor.data?.data.type || "",
	);

	const [isDocsDrawerOpen, docsDrawer] = useDisclosure(false);

	return (
		<>
			<LoadingOverlay
				visible={
					monitor.isLoading ||
					config.isLoading ||
					monitorTypeSchema.isLoading ||
					monitorTypeDocs.isLoading
				}
			/>
			<Container mt={"md"}>
				{monitor.data && monitorTypeSchema.data && monitorTypeDocs.data && (
					<_MonitorEditPage
						monitor={monitor.data.data}
						config={config.data?.data || {}} // Expected to be 404 if new monitor without any config saved yet
						integrations={integrations.data?.data || []}
						onShowDocs={docsDrawer.open}
						monitorTypeSchema={
							monitorTypeSchema.data.data as unknown as JSONSchema7
						}
						refreshCallback={async () => {
							await monitor.mutate();
							await config.mutate();
							await monitorTypeSchema.mutate();
							await monitorTypeDocs.mutate();
						}}
					/>
				)}
			</Container>
			<Drawer
				title={`${monitor.data?.data.type} Monitor Documentation`}
				opened={isDocsDrawerOpen}
				onClose={docsDrawer.close}
				position={"right"}
				size={"xl"}
			>
				<MonitorTypeDocs content={monitorTypeDocs.data?.data || ""} />
			</Drawer>
			{SWR_DEBUG && (
				<SWRHookInfo
					hooks={[
						["Monitor", monitor],
						["Config", config],
						["Schema", monitorTypeSchema],
						["Docs", monitorTypeDocs],
					]}
				/>
			)}
		</>
	);
};
