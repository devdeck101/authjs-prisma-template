type AllowedProperties = string | number | boolean;

interface Metadata {
	[Key: string]: AllowedProperties;
}

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
	ContainerElement = "ContainerElement",
}

interface ElementProps extends React.HTMLAttributes<HTMLDivElement> {
	instance: Element;
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

	previewComponent: React.FC<ElementProps>;
	editComponent: React.FC<ElementProps>;
	liveComponent: React.FC<ElementProps>;
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

export {
	DeviceMode,
	ElementType,
	PreviewMode,
	type EditorState,
	type Element,
	type ElementButton,
	type ElementProps,
	type ElementTypes,
};
