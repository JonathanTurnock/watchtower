import { Dialog, List, Stack, Title } from "@mantine/core";
import { AxiosError, AxiosResponse } from "axios";
import { FC } from "react";
import {
	TbAlertCircleFilled,
	TbCircleCheck,
	TbCircleDotted,
} from "react-icons/tb";
import { KeyedMutator } from "swr";

type OrvalHook = {
	data: AxiosResponse | undefined;
	error: AxiosError | undefined;
	mutate: KeyedMutator<AxiosResponse>;
	isValidating: boolean;
	isLoading: boolean;
	swrKey: any;
};

export const SWRHookInfo: FC<{ hooks: Array<[string, OrvalHook]> }> = ({
	hooks,
}) => {
	return (
		<Dialog opened>
			<Title mb={"md"} order={5}>
				SWR Debugger
			</Title>
			<List>
				{hooks.map(([name, hook]) => (
					<Stack key={name}>
						{hook.isLoading && (
							<List.Item c={"blue"} icon={<TbCircleDotted />}>
								{name}
							</List.Item>
						)}
						{hook.error && (
							<List.Item c={"danger"} icon={<TbAlertCircleFilled />}>
								{name}
							</List.Item>
						)}
						{hook.data && (
							<List.Item c={"success"} icon={<TbCircleCheck />}>
								{name}
							</List.Item>
						)}
					</Stack>
				))}
			</List>
		</Dialog>
	);
};
