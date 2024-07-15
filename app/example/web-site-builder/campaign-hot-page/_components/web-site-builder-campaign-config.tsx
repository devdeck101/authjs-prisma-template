import buildWebsiteBuilder from "@/lib/web-site-builder/store";
import { DeviceMode, type EditorState, PreviewMode } from "@/types/web-site-builder";
import { v4 as uuidv4 } from "uuid";



const initialContext: EditorState = {
	editor: {
		id: uuidv4(),
		elements: [],
		deviceMode: DeviceMode.Desktop,
		previewMode: PreviewMode.Edit,
	},
};

export const { WebsiteBuilderContext, WebsiteBuilderProvider } = buildWebsiteBuilder(initialContext);
