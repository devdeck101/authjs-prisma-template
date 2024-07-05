import { type Element, type ElementButton, ElementType } from "@/types/web-site-builder";
import { Text } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
const type: ElementType = ElementType.TextElement;
const customAttributes = {
    text: "Text element",
}

const elementButton: ElementButton = {
    icon: Text,
    label: "Text",
    tooltip: "Text Element",
}
const TextElement: Element = {
    constructor: function () {
        this.id = uuidv4();
        return { ...this };
    },
    id: uuidv4(),
    type,
    customAttributes,
    elementButton,
    previewComponent: PreviewComponent,
    editComponent: () => <span>TextElement editComponent</span>,
    liveComponent: () => <span>TextElement liveComponent</span>,
}


export { elementButton, TextElement };

function PreviewComponent({ instance }: { instance: Element }) {
    const { styles, customAttributes: { text } } = instance
    return <span style={styles}>{text}</span>
} 