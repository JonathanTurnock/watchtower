import { Button } from "@mantine/core";
import { FC, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AppNavigationButton: FC<{
	path: string;
	label: ReactNode;
	leftSection: ReactNode;
}> = ({ label, path, leftSection }) => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<Button
			justify={"start"}
			variant={location.pathname.startsWith(path) ? "outline" : "subtle"}
			onClick={() => navigate(path)}
			leftSection={leftSection}
		>
			{label}
		</Button>
	);
};
