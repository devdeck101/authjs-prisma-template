import { TextElement } from "@/lib/web-site-builder/elements/text-element";
import { ContainerElement } from "@/lib/web-site-builder/elements/container-element";
import type { ElementTypes } from "@/types/web-site-builder";
export const ElementImpl: ElementTypes = {
	TextElement: TextElement,
	ContainerElement: ContainerElement,
};
