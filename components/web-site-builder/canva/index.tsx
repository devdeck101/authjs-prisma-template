"use client";

import { useWebsiteBuilder } from "@/hooks/web-site-builder";
import { cn } from "@/lib/utils";
import { ElementImpl } from "@/lib/web-site-builder/elements";
import type { ElementType } from "@/types/web-site-builder";
import { ActionType, type AddElement, type ReorderElements } from "@/types/web-site-builder/actions";
import { Layers, Plus } from "lucide-react";
import { useState } from "react";

const Canvas = () => {
	const { state, dispatch } = useWebsiteBuilder();
	const [over, setOver] = useState<boolean>(false);

	const onDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
		setOver(true);
	};

	const onDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		setOver(false);
	};

	const onDragEnd = () => {
		setOver(false);
	};

	const onDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setOver(false);

		// Case 1: Reorder an existing canvas element dropped at the end
		const sourceIndexStr = e.dataTransfer.getData("sourceIndex");
		if (sourceIndexStr !== "") {
			const sourceIndex = Number.parseInt(sourceIndexStr, 10);
			if (!Number.isNaN(sourceIndex) && sourceIndex >= 0) {
				const destinationIndex = state.editor.elements.length - 1;
				if (sourceIndex !== destinationIndex && destinationIndex >= 0) {
					const reorderAction: ReorderElements = {
						type: ActionType.ReorderElements,
						payload: {
							sourceIndex,
							destinationIndex,
						},
					};
					dispatch(reorderAction);
				}
				return;
			}
		}

		// Case 2: New element dragged from Sidebar
		const data = e.dataTransfer.getData("elementType") as keyof typeof ElementType;
		if (!data || !ElementImpl[data]) {
			// Ignore safely if no valid element type is found in dataTransfer
			return;
		}

		const myAddAction: AddElement = {
			type: ActionType.AddElement,
			payload: {
				element: ElementImpl[data].constructor(),
			},
		};

		dispatch(myAddAction);
	};

	const elements = state.editor.elements;

	return (
		<div
			className={cn(
				"flex flex-col items-center justify-start flex-1 w-full h-full min-h-[550px] transition-colors relative",
				over ? "bg-primary/5 ring-2 ring-primary ring-inset rounded-xl" : "",
			)}
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
			onDragEnd={onDragEnd}
			onDrop={onDrop}
		>
			{elements.length === 0 ? (
				<div
					className={cn(
						"flex flex-col items-center justify-center flex-1 w-full h-full min-h-[520px] p-8 sm:p-12 text-center rounded-xl border-2 border-dashed transition-all duration-200",
						over
							? "border-primary bg-primary/10 text-primary scale-[0.99]"
							: "border-border/80 bg-muted/5 text-muted-foreground hover:border-primary/40",
					)}
				>
					<div
						className={cn(
							"flex items-center justify-center w-16 h-16 rounded-2xl mb-4 transition-all duration-200 shadow-sm",
							over ? "bg-primary text-primary-foreground scale-110 rotate-90" : "bg-primary/10 text-primary",
						)}
					>
						{over ? <Plus className="h-8 w-8" /> : <Layers className="h-8 w-8" />}
					</div>
					<h3 className="font-bold text-base sm:text-lg text-foreground mb-2">
						{over ? "Solte para adicionar o componente" : "Área de Criação Vazia"}
					</h3>
					<p className="text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed mb-6">
						{over
							? "O componente será inserido nesta página imediatamente."
							: "Arraste componentes da barra lateral direita para esta área para começar a montar sua landing page ou hot page."}
					</p>
					{!over && (
						<div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground font-medium">
							<span className="px-3 py-1 rounded-full bg-muted/60 border shadow-xs">✨ Hero</span>
							<span className="px-3 py-1 rounded-full bg-muted/60 border shadow-xs">📣 CTA</span>
							<span className="px-3 py-1 rounded-full bg-muted/60 border shadow-xs">📝 Básicos</span>
						</div>
					)}
				</div>
			) : (
				elements.map((element) => {
					const PreviewComponent = element.previewComponent;
					return <PreviewComponent key={element.id} instance={element} />;
				})
			)}
		</div>
	);
};

export default Canvas;
