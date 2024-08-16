import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/tiptap/styles.css";

import { MantineProvider } from "@mantine/core";
import { App } from "./App.tsx";
import "./assets/index.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter } from "react-router-dom";
import { theme } from "./theme.ts";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<MantineProvider theme={theme} defaultColorScheme={"dark"}>
			<Notifications />
			<BrowserRouter>
				<ModalsProvider>
					<App />
				</ModalsProvider>
			</BrowserRouter>
		</MantineProvider>
	</StrictMode>,
);
