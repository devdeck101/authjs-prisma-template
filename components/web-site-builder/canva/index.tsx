"use client";

import { useWebsiteBuilder } from "@/hooks/web-site-builder";
import { cn } from "@/lib/utils";
import { ElementImpl } from "@/lib/web-site-builder/elements";
import { ActionType, type AddElement } from "@/types/web-site-builder/actions";
import { useState } from "react";


const Canvas = () => {
    const { state, dispatch } = useWebsiteBuilder();
    const [over, setOver] = useState<boolean>(false);

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setOver(true)
    }

    const onDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setOver(false)
    }

    const onDragEnd = (e: React.DragEvent) => {
        // e.preventDefault();
        setOver(false)
    }

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        // e.stopPropagation();
        const data = e.dataTransfer.getData("elementType");
        const myAddAction: AddElement = {
            type: ActionType.AddElement,
            data: {
                element: ElementImpl.TextElement.constructor(),
            }
        }
        dispatch(myAddAction)
        setOver(false)
    }

    return (
        <div
            className={cn("flex flex-col items-center justify-start flex-1",
                over ? "border border-green-500" : ""
            )}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDragEnd={onDragEnd}
            onDrop={onDrop}
        >
            {
                state.editor.elements.map((element) => {
                    const PreviewComponent = element.previewComponent;
                    return <PreviewComponent key={element.id} instance={element} />
                })
            }
        </div >
    )
}

export default Canvas