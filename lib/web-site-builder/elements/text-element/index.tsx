import { ElementType, type Element } from "@/types/web-site-builder";
import { v4 as uuidv4 } from "uuid"
const type: ElementType = ElementType.TextElement;
const customAttributes = {
    text: "Text Element",
}
const TextElement: Element = {
    id: uuidv4(),
    type,
    customAttributes,
    previewComponent: () => <span>TextElement previewComponent</span>,
    editComponent: () => <span>TextElement editComponent</span>,
    liveComponent: () => <span>TextElement liveComponent</span>,
}

export { TextElement };
