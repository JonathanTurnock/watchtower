import { useMantineTheme } from "@mantine/core";

export const useStatusColorResolver = () => {
	const theme = useMantineTheme();

	return (status?: boolean) =>
		theme.colors[
			status === undefined ? "gray" : status ? "success" : "danger"
		][6];
};
