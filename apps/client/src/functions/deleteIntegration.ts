import { openConfirmModal } from "@mantine/modals";
import { integrationControllerDeleteIntegration } from "@watchtower/api-client";
import { NavigateFunction } from "react-router-dom";
import { showErrorNotification } from "./showErrorNotification.tsx";
import { showSuccessNotification } from "./showSuccessNotification.tsx";

const onConfirm = async (id: number, navigate: NavigateFunction) => {
	try {
		await integrationControllerDeleteIntegration(id);
		showSuccessNotification({ message: "Integration deleted successfully." });
		navigate("/integrations");
	} catch (error) {
		showErrorNotification({ error });
	}
};

/**
 * Opens a confirmation modal to delete a integration.
 * If confirmed, the integration is deleted by calling the integrationControllerDeleteIntegration API.
 */
export const deleteIntegration = (id: number, navigate: NavigateFunction) => {
	openConfirmModal({
		title: "Delete Integration",
		children: "Are you sure you want to delete this integration?",
		labels: { confirm: "Delete", cancel: "Cancel" },
		onConfirm: () => onConfirm(id, navigate),
	});
};
