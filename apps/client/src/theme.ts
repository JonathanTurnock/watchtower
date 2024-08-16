import { createTheme } from "@mantine/core";
import { DraculaTheme } from "dracula-mantine";

export const theme = createTheme({
	...DraculaTheme,
	white: "#ffffff",
	colors: {
		...DraculaTheme.colors,
		dark: [
			"#e5e5e6",
			"#c8c8cd",
			"#a8aab4",
			"#8e909f",
			"#45495E",
			"#3D4052",
			"#343746",
			"#282A36",
			"#1A1B23",
			"#111217",
		],
		success: [
			"#e5feee",
			"#d2f9e0",
			"#a8f1c0",
			"#7aea9f",
			"#53e383",
			"#3bdf70",
			"#2bdd66",
			"#1ac455",
			"#0caf49",
			"#00963c",
		],
		danger: [
			"#ffeaec",
			"#fdd4d6",
			"#f4a7ac",
			"#ec777e",
			"#e64f57",
			"#e3353f",
			"#e22732",
			"#c91a25",
			"#b31220",
			"#9e0419",
		],
	},
});
