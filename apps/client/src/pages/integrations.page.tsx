import { ActionIcon, Container, Flex, Stack, TextInput } from "@mantine/core";
import {
	IntegrationDto,
	IntegrationTypeDto,
	useIntegrationControllerGetIntegrations,
	useIntegrationTypeControllerGetIntegrationTypes,
} from "@watchtower/api-client";
import { FC } from "react";
import { TbPlus } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { IntegrationCard } from "../components/integration-card.tsx";
import { openNewIntegrationFormModal } from "../functions/openNewIntegrationFormModal.tsx";
import { useFuse } from "../hooks/useFuse.ts";

const _IntegrationCard: FC<{
	integration: IntegrationDto;
	type?: IntegrationTypeDto;
}> = ({ integration, type }) => {
	const navigate = useNavigate();

	return (
		<IntegrationCard
			onClick={() => navigate(`/integrations/${integration.id}/edit`)}
			name={integration.name}
			type={type?.name || integration.type}
		/>
	);
};

export const IntegrationsPage: FC = () => {
	const navigate = useNavigate();
	const integrations = useIntegrationControllerGetIntegrations();
	const integrationTypes = useIntegrationTypeControllerGetIntegrationTypes();
	const { search, setSearch, results } = useFuse(integrations.data?.data || []);

	return (
		<Container mt={"md"}>
			<Stack>
				<Flex gap={"xs"} align={"center"}>
					<TextInput
						flex="auto"
						placeholder={"Search"}
						value={search}
						onChange={(event) => setSearch(event.currentTarget.value)}
					/>
					<ActionIcon
						onClick={() =>
							openNewIntegrationFormModal(
								integrationTypes.data?.data || [],
								navigate,
							)
						}
						size={"lg"}
					>
						<TbPlus />
					</ActionIcon>
				</Flex>
				{results.map((integration) => (
					<_IntegrationCard
						key={integration.id}
						integration={integration}
						type={integrationTypes.data?.data.find(
							(it) => it.id === integration.type,
						)}
					/>
				))}
			</Stack>
		</Container>
	);
};
