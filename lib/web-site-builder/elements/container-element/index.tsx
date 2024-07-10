import { type Element, type ElementButton, ElementType } from "@/types/web-site-builder";
import { BoxSelect } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const type: ElementType = ElementType.ContainerElement;
const customAttributes = {
    name: "Container"
};

const elementButton: ElementButton = {
    icon: BoxSelect,
    label: "Container",
    tooltip: "Container",
};
const ContainerElement: Element = {
    constructor: function () {
        this.id = uuidv4();
        return { ...this };
    },
    id: uuidv4(),
    type,
    customAttributes,
    elementButton,
    previewComponent: () => <div>Placeholder</div>,
    editComponent: () => <div>Placeholder</div>,
    liveComponent: () => <div>Placeholder</div>,
};

export { elementButton, ContainerElement };