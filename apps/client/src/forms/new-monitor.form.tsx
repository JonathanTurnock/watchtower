import { Button, Group, Select, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { FC } from "react";
import { z } from "zod";

export const newMonitorFormSchema = z.object({
	name: z.string().min(2, { message: "Name should have at least 2 letters" }),
	type: z.string(),
});

export type NewMonitorFormValues = z.infer<typeof newMonitorFormSchema>;

export const NewMonitorForm: FC<{
	onSubmit: (values: NewMonitorFormValues) => void;
	types: { id: string; name: string; description: string }[];
}> = ({ onSubmit, types }) => {
	const form = useForm<NewMonitorFormValues>({
		mode: "uncontrolled",
		initialValues: { name: "", type: "" },
		validate: zodResolver(newMonitorFormSchema),
		validateInputOnBlur: true,
	});

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<Stack>
				<TextInput
					label="Name"
					placeholder="Name"
					description={
						"This is the name of the monitor and will be used to identify it on dashboards."
					}
					key={form.key("name")}
					{...form.getInputProps("name")}
				/>
				<Select
					label="Type"
					placeholder="Select a type"
					description={"This is the monitor type"}
					data={types.map((it) => ({ label: it.name, value: it.id }))}
					key={form.key("type")}
					{...form.getInputProps("type")}
				/>
			</Stack>
			<Group>
				<Button type="submit" mt="sm">
					Create
				</Button>
			</Group>
		</form>
	);
};
