import { Card, Group, Stack, Text } from "@mantine/core";
import { FC } from "react";

export type IntegrationCardProps = {
	onClick: () => void;
	name: string;
	type: string;
};
export const IntegrationCard: FC<IntegrationCardProps> = ({
	name,
	type,
	onClick,
}) => {
	return (
		<Card>
			<Group justify={"space-between"}>
				<Group>
					<Stack gap={0}>
						<Text fw={"bold"} onClick={onClick} style={{ cursor: "pointer" }}>
							{name}
						</Text>
						<Text size={"xs"} c={"dimmed"}>
							{type}
						</Text>
					</Stack>
				</Group>
			</Group>
		</Card>
	);
};
