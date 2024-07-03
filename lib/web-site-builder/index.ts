import type { ElementTypes } from "@/types/web-site-builder";

import { TextElement } from "@/lib/web-site-builder/elements/text-element";
import { Container } from "@/lib/web-site-builder/elements/container";

const Elements: ElementTypes = {
	Container: Container,
	TextElement: TextElement,
};
export default Elements;

export { TextElement } from "@/lib/web-site-builder/elements/text-element";
