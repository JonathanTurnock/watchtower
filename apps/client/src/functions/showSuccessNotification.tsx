import { showNotification } from "@mantine/notifications";
import { ReactNode } from "react";
import { TbCircleCheck } from "react-icons/tb";

export type SuccessNotificationProps = {
	title?: ReactNode;
	message?: ReactNode;
};
export const showSuccessNotification = (props: SuccessNotificationProps) =>
	showNotification({
		icon: <TbCircleCheck />,
		title: props.title,
		message: props.message || "Success",
		color: "green",
	});
