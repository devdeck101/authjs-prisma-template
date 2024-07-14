import ElementActions from "@/components/web-site-builder/preview/element-actions";
import { cn } from "@/lib/utils";
import { type Element, type ElementButton, type ElementProps, ElementType } from "@/types/web-site-builder";
import { ActionType, type AddElement, type SelectElement } from "@/types/web-site-builder/actions";
import { ElementImpl } from "@/lib/web-site-builder/elements";
import { BoxSelect } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useWebsiteBuilder } from "@/hooks/web-site-builder";
import { useState } from "react";

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
    previewComponent: previewComponent,
    editComponent: () => <div>Placeholder</div>,
    liveComponent: () => <div>Placeholder</div>,
};

export { elementButton, ContainerElement };


function previewComponent({ instance, children, className, ...rest }: ElementProps) {
    const { dispatch } = useWebsiteBuilder();
    const [over, setOver] = useState<boolean>(false);
    const { id: dropAreaId } = instance;

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation()
        setOver(true);
    };

    const onDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setOver(false);
    };

    const onDragEnd = (e: React.DragEvent) => {
        e.preventDefault();
        setOver(false);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const data: keyof typeof ElementType = e.dataTransfer.getData("elementType") as keyof typeof ElementType;
        const myAddAction: AddElement = {
            type: ActionType.AddElement,
            payload: {
                containerId: dropAreaId,
                element: ElementImpl[data].constructor(),
            },
        };

        dispatch(myAddAction);
        setOver(false);
    };


    const handleRender = (element: Element) => {
        if (!Array.isArray(element.content)) {
            return (
                <ElementActions element={element} key={element.id}>
                    <div
                        {...rest}
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDragEnd={onDragEnd}
                        onDrop={onDrop}
                        className={cn("grid grid-cols-2 m-2 p-2 border",
                            { "border border-green-500": over })}>
                        {element.id.substring(element.id.length - 6, element.id.length)}
                    </div>
                </ElementActions >
            )
        }


        return (

            <ElementActions element={element} key={element.id}>
                <div
                    {...rest}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDragEnd={onDragEnd}
                    onDrop={onDrop}
                    className={cn("grid grid-cols-2 m-2 p-2 border",
                        { "border border-green-500": over }, className)} >
                    {element.id.substring(element.id.length - 6, element.id.length)}
                    {
                        element.content.map((el) => {
                            const PreviewComponent = el.previewComponent;
                            return (
                                <PreviewComponent key={el.id} instance={el} />
                            )
                        })
                    }

                </div>
            </ElementActions >
        )

    }




    return (
        // <ElementActions elementId={instance.id} key={instance.id}>
        <>
            {handleRender(instance)}
        </>


        // </ElementActions >
    )
}