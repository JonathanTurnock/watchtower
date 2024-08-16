import { showNotification } from "@mantine/notifications";
import { ReactNode } from "react";
import { TbExclamationCircle } from "react-icons/tb";

export type ErrorNotificationProps = {
	title?: ReactNode;
	message?: ReactNode;
	error: Error;
};
export const showErrorNotification = (props: ErrorNotificationProps) =>
	showNotification({
		icon: <TbExclamationCircle />,
		title: props.title || props.error.name,
		message: props.message || props.error.message,
		color: "red",
	});
