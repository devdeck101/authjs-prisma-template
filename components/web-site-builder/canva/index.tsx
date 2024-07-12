"use client";

import { useWebsiteBuilder } from "@/hooks/web-site-builder";
import { cn } from "@/lib/utils";
import { ElementImpl } from "@/lib/web-site-builder/elements";
import type { ElementType, Element } from "@/types/web-site-builder";
import { ActionType, type AddElement, type SelectElement } from "@/types/web-site-builder/actions";
import { useState } from "react";

const Canvas = () => {
	const { state, dispatch } = useWebsiteBuilder();
	const [over, setOver] = useState<boolean>(false);

	const onDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setOver(true);
	};

	const onDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		setOver(false);
	};

	const onDragEnd = (e: React.DragEvent) => {
		// e.preventDefault();
		setOver(false);
	};

	const onDrop = (e: React.DragEvent) => {
		e.stopPropagation();
		// const data = e.dataTransfer.getData("elementType");
		const data: keyof typeof ElementType = e.dataTransfer.getData("elementType") as keyof typeof ElementType;
		const myAddAction: AddElement = {
			type: ActionType.AddElement,
			payload: {
				element: ElementImpl[data].constructor(),
			},
		};

		dispatch(myAddAction);
		setOver(false);
	};

	const handleElementClick = (element: Element) => {
		const mySelectAction: SelectElement = {
			type: ActionType.SelectElement,
			payload: {
				element,
			},
		};
		dispatch(mySelectAction);
	};

	//TODO: MousePointer on elements
	return (
		<div
			className={cn("flex flex-col items-center justify-start flex-1 cursor-pointer", over ? "border border-green-500" : "")}
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
			onDragEnd={onDragEnd}
			onDrop={onDrop}
		>
			{state.editor.elements.map((element) => {
				const PreviewComponent = element.previewComponent;
				return (
					<PreviewComponent
						onClick={(e: React.MouseEvent) => {
							handleElementClick(element)
						}}
						key={element.id}
						instance={element}
					/>
				);
			})}

		</div>
	);
};

export default Canvas;
