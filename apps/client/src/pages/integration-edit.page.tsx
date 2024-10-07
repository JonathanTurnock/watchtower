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
	integrationConfigControllerUpdateIntegrationConfig,
	integrationControllerUpdateIntegration,
	useIntegrationConfigControllerGetIntegrationConfig,
	useIntegrationControllerGetIntegration,
	useIntegrationTypeControllerGetSchema,
	useIntegrationTypeControllerGetSchemaDocs,
} from "@watchtower/api-client";
import { JSONSchema7 } from "json-schema";
import { FC } from "react";
import { TbArrowLeft } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { SWRHookInfo } from "../components/hook-debugger.tsx";
import { MonitorTypeDocs } from "../components/monitor-type-docs.tsx";
import { SWR_DEBUG } from "../config.ts";
import {
	EditIntegrationForm,
	EditIntegrationFormValues,
} from "../forms/edit-integration-form.tsx";
import { showErrorNotification } from "../functions/showErrorNotification.tsx";
import { showSuccessNotification } from "../functions/showSuccessNotification.tsx";

const _IntegrationEditPage: FC<{
	integration: IntegrationDto;
	config: any;
	onShowDocs: () => void;
	integrationTypeSchema: JSONSchema7;
	refreshCallback: () => Promise<void>;
}> = ({
	integration,
	config,
	refreshCallback,
	integrationTypeSchema,
	onShowDocs,
}) => {
	const navigate = useNavigate();

	async function handleSubmit(values: EditIntegrationFormValues, config: any) {
		try {
			await integrationConfigControllerUpdateIntegrationConfig(
				integration.id,
				config,
			);
			await integrationControllerUpdateIntegration(integration.id, {
				name: values.name,
			});
			showSuccessNotification({ message: "Integration updated successfully" });
			await refreshCallback();
		} catch (error) {
			showErrorNotification({
				title: "Error updating integration",
				error,
			});
		}
	}

	return (
		<Stack>
			<Group>
				<ActionIcon
					variant={"subtle"}
					onClick={() => navigate("/integrations")}
				>
					<TbArrowLeft />
				</ActionIcon>
				<Title order={2}>Edit {integration.type} Integration</Title>
			</Group>
			<EditIntegrationForm
				onSubmit={handleSubmit}
				integrationTypeSchema={integrationTypeSchema}
				onShowDocs={onShowDocs}
				initialValues={{
					name: integration.name,
				}}
				initialConfig={config}
			/>
		</Stack>
	);
};

export const IntegrationEditPage: FC<{}> = ({}) => {
	const { id } = useParams();

	const integration = useIntegrationControllerGetIntegration(Number(id || 0));
	const config = useIntegrationConfigControllerGetIntegrationConfig(
		Number(id || 0),
	);
	const integrationTypeSchema = useIntegrationTypeControllerGetSchema(
		integration.data?.data.type || "",
	);
	const integrationTypeDocs = useIntegrationTypeControllerGetSchemaDocs(
		integration.data?.data.type || "",
	);

	const [isDocsDrawerOpen, docsDrawer] = useDisclosure(false);

	return (
		<>
			<LoadingOverlay
				visible={
					integration.isLoading ||
					config.isLoading ||
					integrationTypeSchema.isLoading ||
					integrationTypeDocs.isLoading
				}
			/>
			<Container mt={"md"}>
				{integration.data &&
					integrationTypeSchema.data &&
					integrationTypeDocs.data && (
						<_IntegrationEditPage
							integration={integration.data.data}
							config={config.data?.data || {}} // Expected to be 404 if new integration without any config saved yet
							onShowDocs={docsDrawer.open}
							integrationTypeSchema={
								integrationTypeSchema.data.data as unknown as JSONSchema7
							}
							refreshCallback={async () => {
								await integration.mutate();
								await config.mutate();
								await integrationTypeSchema.mutate();
								await integrationTypeDocs.mutate();
							}}
						/>
					)}
			</Container>
			<Drawer
				title={`${integration.data?.data.type} Integration Documentation`}
				opened={isDocsDrawerOpen}
				onClose={docsDrawer.close}
				position={"right"}
				size={"xl"}
			>
				<MonitorTypeDocs content={integrationTypeDocs.data?.data || ""} />
			</Drawer>
			{SWR_DEBUG && (
				<SWRHookInfo
					hooks={[
						["Integration", integration],
						["Config", config],
						["Schema", integrationTypeSchema],
						["Docs", integrationTypeDocs],
					]}
				/>
			)}
		</>
	);
};
