import {
	ActionIcon,
	Alert,
	Button,
	Group,
	Stack,
	Text,
	TextInput,
	Title,
	useComputedColorScheme,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import Editor, { Monaco } from "@monaco-editor/react";
import { integrationTypeControllerValidateSchema } from "@watchtower/api-client";
import { JSONSchema7 } from "json-schema";
import { last } from "lodash";
import { FC, useState } from "react";
import { TbHelpCircle } from "react-icons/tb";
import { z } from "zod";
import { dracula } from "../monco-themes.ts";

export const configHttpFormSchema = z.object({
	name: z.string().min(2, { message: "Name should have at least 2 letters" }),
});
export type EditIntegrationFormValues = z.infer<typeof configHttpFormSchema>;

export type EditIntegrationFormProps = {
	initialConfig: any;
	initialValues: EditIntegrationFormValues;
	integrationTypeSchema: JSONSchema7;
	onShowDocs: () => void;
	onSubmit: (values: EditIntegrationFormValues, config: any) => void;
};
export const EditIntegrationForm: FC<EditIntegrationFormProps> = ({
	initialConfig,
	onSubmit,
	initialValues,
	integrationTypeSchema,
	onShowDocs,
}) => {
	const colorScheme = useComputedColorScheme();
	const form = useForm({
		mode: "uncontrolled",
		initialValues,
		validate: zodResolver(configHttpFormSchema),
		validateInputOnBlur: true,
	});

	const handleEditorWillMount = (monaco: Monaco) => {
		monaco.editor.defineTheme("dracula", dracula);
		monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
			validate: true,
			allowComments: true,
			schemaValidation: "error",
			enableSchemaRequest: true,
			schemaRequest: "error",
			schemas: [
				{
					uri: integrationTypeSchema.$id || "",
					fileMatch: ["*"],
					schema: integrationTypeSchema,
				},
			],
		});
	};
	const [config, setConfig] = useState<string>(
		JSON.stringify(initialConfig, undefined, 2),
	);

	const [configError, setConfigError] = useState<any>(null);

	const handleSubmit = async (values: EditIntegrationFormValues) => {
		try {
			const parsedConfig = JSON.parse(config);
			await integrationTypeControllerValidateSchema(
				last(integrationTypeSchema.$id?.split("/")) as string,
				parsedConfig,
			);
			setConfigError(null);
			onSubmit(values, JSON.parse(config));
		} catch (e) {
			setConfigError(e);
		}
	};

	return (
		<>
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<Stack gap={"xl"}>
					<Stack>
						<Title order={3}>Properties</Title>
						<TextInput
							label="Name"
							placeholder="Name"
							description={
								"This is the name of the integration and will be used to identify it on dashboards."
							}
							key={form.key("name")}
							{...form.getInputProps("name")}
						/>
					</Stack>
					<Stack gap={4}>
						<Group justify={"space-between"}>
							<Stack gap={0}>
								<Title order={3}>Configuration</Title>
								<Text size={"xs"} c={"dimmed"}>
									Setup your integration configuration using the editor below,
									open the documentation using the Help icon for more
									information.
								</Text>
							</Stack>
							<ActionIcon variant={"subtle"} onClick={onShowDocs}>
								<TbHelpCircle />
							</ActionIcon>
						</Group>

						{configError && (
							<Alert
								title={
									"Validation Failed, please correct the following issues:"
								}
							>
								<pre>
									{JSON.stringify(
										configError.response.data.message,
										undefined,
										2,
									)}
								</pre>
							</Alert>
						)}

						<Editor
							theme={colorScheme === "dark" ? "dracula" : "vs"}
							height={300}
							defaultLanguage="json"
							options={{
								minimap: { enabled: false },
								lineNumbers: "off",
								fontSize: 14,
							}}
							beforeMount={handleEditorWillMount}
							value={config}
							onChange={(v) => v && setConfig(v)}
						/>
					</Stack>
					<Group>
						<Button type="submit" mt="sm">
							Save
						</Button>
					</Group>
				</Stack>
			</form>
		</>
	);
};
