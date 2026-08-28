"use client";
import type { Element } from "@/types/web-site-builder";

type Props = {
	element: Element;
};

const ElementButton = ({ element }: Props) => {
	const { label, icon: Icon, tooltip } = element.elementButton;
	const { type } = element;

	const onDragStart = (e: React.DragEvent) => {
		e.stopPropagation();
		e.dataTransfer.dropEffect = "move";
		e.dataTransfer.setData("elementType", type);
	};

	return (
		<button
			type="button"
			className="group flex flex-col items-center justify-center w-full min-h-[5.5rem] p-3 gap-2 rounded-xl border border-border/60 bg-card hover:bg-accent/40 hover:border-primary/40 text-card-foreground shadow-sm transition-all duration-200 cursor-grab active:cursor-grabbing hover:shadow-md select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			draggable="true"
			onDragStart={onDragStart}
			title={tooltip || label}
		>
			<div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105 transition-all duration-200">
				<Icon className="h-5 w-5" />
			</div>
			<span className="text-xs font-medium text-center leading-tight text-foreground/90 group-hover:text-foreground line-clamp-2 px-0.5">
				{label}
			</span>
		</button>
	);
};

export default ElementButton;
