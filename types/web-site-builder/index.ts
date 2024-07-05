type AllowedProperties = string | number | boolean;

interface Metadata {
	[Key: string]: AllowedProperties;
}
// type DeviceMode = "Mobile" | "Tablet" | "Desktop"
enum DeviceMode {
	Mobile = "Mobile",
	Tablet = "Tablet",
	Desktop = "Desktop",
}

enum PreviewMode {
	Edit = "Edit",
	Preview = "Preview",
	Live = "Live",
}

enum ElementType {
	TextElement = "TextElement",
}

interface Element {
	constructor: () => Element;
	id: string;
	type: ElementType;
	content?: Element[];
	styles?: React.CSSProperties;
	customAttributes: Record<string, AllowedProperties>;
	metadata?: Metadata;
	elementButton: ElementButton;

	previewComponent: React.FC<{ instance: Element }>;
	editComponent: React.FC<{ instance: Element }>;
	liveComponent: React.FC<{ instance: Element }>;
}

interface ElementButton {
	icon: React.ElementType;
	label: string;
	tooltip: string;
}

interface Editor {
	id: string;
	elements: Element[];
	selectedElement?: Element;
	customAttributes?: Record<string, AllowedProperties>;
	metadata?: Metadata;
	deviceMode: DeviceMode;
	previewMode: PreviewMode;
}

interface EditorState {
	editor: Editor;
}

type ElementTypes = {
	[K in ElementType]: Element;
};

export { DeviceMode, ElementType, PreviewMode, type EditorState, type Element, type ElementButton, type ElementTypes };
