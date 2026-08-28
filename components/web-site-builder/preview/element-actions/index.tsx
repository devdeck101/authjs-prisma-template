"use client";

import { Button } from "@/components/ui/button";
import { useWebsiteBuilder } from "@/hooks/web-site-builder";
import { cn } from "@/lib/utils";
import { ElementImpl } from "@/lib/web-site-builder/elements";
import type { Element, ElementType } from "@/types/web-site-builder";
import {
	ActionType,
	type AddElement,
	type DeleteElement,
	type MoveElement,
	type ReorderElements,
	type SelectElement,
} from "@/types/web-site-builder/actions";
import { ArrowDown, ArrowUp, GripVertical, Trash } from "lucide-react";
import { type PropsWithChildren, useState } from "react";

interface Props extends PropsWithChildren {
	element: Element;
}

const ElementActions = ({ children, element }: Props) => {
	const { state, dispatch } = useWebsiteBuilder();
	const [isDropTarget, setIsDropTarget] = useState<"top" | "bottom" | null>(null);

	const elements = state.editor.elements;
	const currentIndex = elements.findIndex((el) => el.id === element.id);
	const isFirst = currentIndex === 0;
	const isLast = currentIndex === elements.length - 1;
	const isSelected = state.editor.selectedElement?.id === element.id;

	const handleDeleteElement = (elementId: string) => {
		const myDeleteAction: DeleteElement = {
			type: ActionType.DeleteElement,
			payload: {
				elementId,
			},
		};
		dispatch(myDeleteAction);
	};

	const handleElementClick = (targetElement: Element) => {
		const mySelectAction: SelectElement = {
			type: ActionType.SelectElement,
			payload: {
				element: targetElement,
			},
		};
		dispatch(mySelectAction);
	};

	const handleMove = (direction: "up" | "down") => {
		const moveAction: MoveElement = {
			type: ActionType.MoveElement,
			payload: {
				elementId: element.id,
				direction,
			},
		};
		dispatch(moveAction);
	};

	const onDragStart = (e: React.DragEvent) => {
		e.stopPropagation();
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData("draggedElementId", element.id);
		e.dataTransfer.setData("sourceIndex", currentIndex.toString());
	};

	const onDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		e.dataTransfer.dropEffect = "move";

		const rect = e.currentTarget.getBoundingClientRect();
		const midY = rect.top + rect.height / 2;
		if (e.clientY < midY) {
			setIsDropTarget("top");
		} else {
			setIsDropTarget("bottom");
		}
	};

	const onDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDropTarget(null);
	};

	const onDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		const dropPosition = isDropTarget || "bottom";
		setIsDropTarget(null);

		// Case 1: Reorder an existing canvas element
		const draggedElementId = e.dataTransfer.getData("draggedElementId");
		const sourceIndexStr = e.dataTransfer.getData("sourceIndex");
		if (draggedElementId && sourceIndexStr !== "") {
			const sourceIndex = Number.parseInt(sourceIndexStr, 10);
			if (!Number.isNaN(sourceIndex)) {
				let destinationIndex = dropPosition === "top" ? currentIndex : currentIndex;
				if (dropPosition === "bottom" && sourceIndex < currentIndex) {
					destinationIndex = currentIndex;
				} else if (dropPosition === "bottom" && sourceIndex > currentIndex) {
					destinationIndex = currentIndex + 1;
				}
				if (sourceIndex !== destinationIndex) {
					const reorderAction: ReorderElements = {
						type: ActionType.ReorderElements,
						payload: {
							sourceIndex,
							destinationIndex,
						},
					};
					dispatch(reorderAction);
				}
			}
			return;
		}

		// Case 2: New element dropped from Sidebar onto this position
		const elementType = e.dataTransfer.getData("elementType") as keyof typeof ElementType;
		if (elementType && ElementImpl[elementType]) {
			const targetIndex = dropPosition === "top" ? currentIndex : currentIndex + 1;
			const addAction: AddElement = {
				type: ActionType.AddElement,
				payload: {
					element: ElementImpl[elementType].constructor(),
					targetIndex,
				},
			};
			dispatch(addAction);
		}
	};

	return (
		<div
			className={cn(
				"relative w-full transition-all duration-150 select-none",
				isDropTarget === "top" && "border-t-4 border-primary pt-1",
				isDropTarget === "bottom" && "border-b-4 border-primary pb-1",
			)}
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
			onDrop={onDrop}
		>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: element selection wrapper */}
			<div
				className={cn(
					"relative w-full group transition-all duration-150 rounded-lg text-left",
					isSelected
						? "ring-2 ring-primary ring-offset-2 ring-offset-background"
						: "hover:ring-1 hover:ring-primary/40",
				)}
				onClick={(e: React.MouseEvent) => {
					e.stopPropagation();
					handleElementClick(element);
				}}
			>
				{/* Barra de Ações Flutuante (Mover Cima, Mover Baixo, Arrastar, Excluir) */}
				{/* biome-ignore lint/a11y/useKeyWithClickEvents: toolbar click propagation stopper */}
				<div
					className={cn(
						"absolute right-3 top-3 z-30 flex items-center gap-1 p-1 rounded-lg bg-background/95 border border-border/80 shadow-md backdrop-blur-sm transition-opacity duration-200",
						isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100",
					)}
					onClick={(e) => e.stopPropagation()}
				>
					{/* Handle de Arraste */}
					<div
						draggable
						onDragStart={onDragStart}
						className="flex items-center justify-center h-7 w-7 rounded hover:bg-muted text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing transition-colors"
						title="Arraste para reorganizar"
					>
						<GripVertical className="h-4 w-4" />
					</div>

					<div className="h-4 w-px bg-border/60 my-auto" />

					{/* Mover para Cima */}
					<Button
						type="button"
						variant="ghost"
						size="icon"
						disabled={isFirst}
						onClick={(e) => {
							e.stopPropagation();
							handleMove("up");
						}}
						className="h-7 w-7 rounded hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
						title="Mover para cima"
					>
						<ArrowUp className="h-3.5 w-3.5" />
					</Button>

					{/* Mover para Baixo */}
					<Button
						type="button"
						variant="ghost"
						size="icon"
						disabled={isLast}
						onClick={(e) => {
							e.stopPropagation();
							handleMove("down");
						}}
						className="h-7 w-7 rounded hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
						title="Mover para baixo"
					>
						<ArrowDown className="h-3.5 w-3.5" />
					</Button>

					<div className="h-4 w-px bg-border/60 my-auto" />

					{/* Excluir Componente */}
					<Button
						type="button"
						variant="ghost"
						size="icon"
						onClick={(e) => {
							e.stopPropagation();
							handleDeleteElement(element.id);
						}}
						className="h-7 w-7 rounded hover:bg-destructive/10 text-destructive hover:text-destructive"
						title="Excluir componente"
					>
						<Trash className="h-3.5 w-3.5" />
					</Button>
				</div>

				{/* Nome do Componente quando Selecionado */}
				{isSelected && (
					<div className="absolute left-3 top-3 z-30 px-2.5 py-1 rounded-md bg-primary text-primary-foreground text-[11px] font-semibold shadow-sm pointer-events-none">
						{element.elementButton?.label || element.type}
					</div>
				)}

				{children}
			</div>
		</div>
	);
};

export default ElementActions;
