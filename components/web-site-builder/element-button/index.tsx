"use client";
import { Button } from "@/components/ui/button";
import type { Element } from "@/types/web-site-builder";

type Props = {
	element: Element;
};

const ElementButton = ({ element }: Props) => {
	const { label, icon: Icon } = element.elementButton;
	const { type } = element;

	const onDragStart = (e: React.DragEvent) => {
		e.stopPropagation();
		e.dataTransfer.dropEffect = "move";
		e.dataTransfer.setData("elementType", type);
		// console.log(e.dataTransfer)
	};

	return (
		<Button
			className="flex items-center justify-center cursor-grab h-20 w-20 gap-2 rounded-lg bg-accent px-3 py-2 text-accent-foreground transition-colors hover:bg-accent/90"
			draggable="true"
			onDragStart={onDragStart}
		>
			<Icon className="h-8 w-5" />
			{label}
		</Button>
	);
};

export default ElementButton;
