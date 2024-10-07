import { modals, openModal } from "@mantine/modals";
import {
	IntegrationTypeDto,
	integrationControllerAddIntegration,
} from "@watchtower/api-client";
import { NavigateFunction } from "react-router-dom";
import {
	NewIntegrationForm,
	NewIntegrationFormValues,
} from "../forms/new-integration.form.tsx";
import { showErrorNotification } from "./showErrorNotification.tsx";
import { showSuccessNotification } from "./showSuccessNotification.tsx";

const onSubmit =
	(navigate: NavigateFunction) =>
	async ({ name, type }: NewIntegrationFormValues) => {
		try {
			const integration = await integrationControllerAddIntegration({
				name,
				type,
			});
			showSuccessNotification({
				message: "Integration created successfully",
			});
			modals.closeAll();
			navigate(`/integrations/${integration.data.id}`);
		} catch (e) {
			showErrorNotification(e);
		}
	};

/**
 * Opens a modal to create a new integration.
 * The integration is created by calling the integrationControllerAddIntegration API.
 */
export const openNewIntegrationFormModal = (
	integrationTypes: IntegrationTypeDto[],
	navigate: NavigateFunction,
) => {
	openModal({
		title: "New Integration",
		children: (
			<NewIntegrationForm
				types={integrationTypes}
				onSubmit={onSubmit(navigate)}
			/>
		),
	});
};
