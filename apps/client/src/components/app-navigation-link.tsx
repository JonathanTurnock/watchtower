import { NavLink } from "@mantine/core";
import { FC, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AppNavigationLink: FC<{
	path: string;
	label: ReactNode;
	leftSection: ReactNode;
}> = ({ label, path, leftSection }) => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<NavLink
			active={location.pathname.startsWith(path)}
			onClick={() => navigate(path)}
			leftSection={leftSection}
			label={label}
		/>
	);
};
