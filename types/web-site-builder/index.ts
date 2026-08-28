import type { PropsWithChildren } from "react";

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
	SimpleBannerElement = "SimpleBannerElement",
	DefaultHeroElement = "DefaultHeroElement",
	VisualHeadingHeroElement = "VisualHeadingHeroElement",
	DefaultCtaElement = "DefaultCtaElement",
	ImageCtaElement = "ImageCtaElement",
	HeadingCtaElement = "HeadingCtaElement",
}

interface ElementProps extends React.HTMLAttributes<HTMLDivElement>, PropsWithChildren {
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

interface ComponentCategory {
	id: string;
	label: string;
	icon: React.ElementType;
	elements: Element[];
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
	type ComponentCategory,
	type EditorState,
	type Element,
	type ElementButton,
	type ElementProps,
	type ElementTypes,
};
