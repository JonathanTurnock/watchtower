import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { marked } from "marked";
import { FC } from "react";

export type MonitorTypeDocsProps = {
	content: string;
};
export const MonitorTypeDocs: FC<MonitorTypeDocsProps> = ({ content }) => {
	const editor = useEditor({
		extensions: [StarterKit],
		content: marked(content),
	});

	return (
		<RichTextEditor editor={editor} styles={{ root: { border: "none" } }}>
			<RichTextEditor.Content />
		</RichTextEditor>
	);
};
