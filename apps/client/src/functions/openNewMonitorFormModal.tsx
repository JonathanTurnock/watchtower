import { modals, openModal } from "@mantine/modals";
import {
	MonitorTypeDto,
	monitorControllerAddMonitor,
} from "@watchtower/api-client";
import { NavigateFunction } from "react-router-dom";
import {
	NewMonitorForm,
	NewMonitorFormValues,
} from "../forms/new-monitor.form.tsx";
import { showErrorNotification } from "./showErrorNotification.tsx";
import { showSuccessNotification } from "./showSuccessNotification.tsx";

const onSubmit =
	(navigate: NavigateFunction) =>
	async ({ name, type }: NewMonitorFormValues) => {
		try {
			const monitor = await monitorControllerAddMonitor({
				name,
				type,
			});
			showSuccessNotification({
				message: "Monitor created successfully",
			});
			modals.closeAll();
			navigate(`/monitors/${monitor.data.id}`);
		} catch (e) {
			showErrorNotification(e);
		}
	};

/**
 * Opens a modal to create a new monitor.
 * The monitor is created by calling the monitorControllerAddMonitor API.
 */
export const openNewMonitorFormModal = (
	monitorTypes: MonitorTypeDto[],
	navigate: NavigateFunction,
) => {
	openModal({
		title: "New Monitor",
		children: (
			<NewMonitorForm types={monitorTypes} onSubmit={onSubmit(navigate)} />
		),
	});
};
