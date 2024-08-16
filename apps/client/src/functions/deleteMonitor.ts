import { openConfirmModal } from "@mantine/modals";
import { monitorControllerDeleteMonitor } from "@watchtower/api-client";
import { NavigateFunction } from "react-router-dom";
import { showErrorNotification } from "./showErrorNotification.tsx";
import { showSuccessNotification } from "./showSuccessNotification.tsx";

const onConfirm = async (id: number, navigate: NavigateFunction) => {
	try {
		await monitorControllerDeleteMonitor(id);
		showSuccessNotification({ message: "Monitor deleted successfully." });
		navigate("/monitors");
	} catch (error) {
		showErrorNotification({ error });
	}
};

/**
 * Opens a confirmation modal to delete a monitor.
 * If confirmed, the monitor is deleted by calling the monitorControllerDeleteMonitor API.
 */
export const deleteMonitor = (id: number, navigate: NavigateFunction) => {
	openConfirmModal({
		title: "Delete Monitor",
		children: "Are you sure you want to delete this monitor?",
		labels: { confirm: "Delete", cancel: "Cancel" },
		onConfirm: () => onConfirm(id, navigate),
	});
};
