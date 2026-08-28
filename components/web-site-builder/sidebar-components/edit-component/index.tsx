"use client";
import { SquareX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { useWebsiteBuilder } from "@/hooks/web-site-builder";
import { ElementImpl } from "@/lib/web-site-builder/elements";
import { ActionType, type UnselectElement } from "@/types/web-site-builder/actions";

const EditComponent = () => {
	const {
		state: {
			editor: { selectedElement: element },
		},
		dispatch,
	} = useWebsiteBuilder();
	if (!element) return null;

	const { type } = element;

	const Component = ElementImpl[type].editComponent;

	const handleUnselectElement = () => {
		const mySelectAction: UnselectElement = {
			type: ActionType.UnselectElement,
		};
		dispatch(mySelectAction);
	};

	return (
		<Card className="w-full border-border/60 shadow-sm rounded-xl overflow-hidden">
			<CardHeader className="flex flex-row items-start bg-muted/40 p-4 pb-3">
				<div className="grid gap-0.5">
					<CardTitle className="group flex items-center gap-2 text-base font-semibold">
						{element.elementButton?.label || element.type}
					</CardTitle>
					<CardDescription className="text-xs">Edite as configurações do componente</CardDescription>
				</div>
				<div className="ml-auto flex items-center gap-1">
					<Button
						onClick={handleUnselectElement}
						size="icon"
						variant="ghost"
						className="h-8 w-8 text-muted-foreground hover:text-foreground"
					>
						<SquareX className="h-4 w-4" />
					</Button>
				</div>
			</CardHeader>
			<CardContent className="p-4 text-sm">
				<div className="grid gap-3">
					<div className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Propriedades</div>
					<Separator className="my-1" />
					<Component instance={element} />
				</div>
			</CardContent>
			<CardFooter className="flex flex-row items-center border-t bg-muted/30 px-4 py-2.5">
				<div className="text-[11px] text-muted-foreground font-mono truncate">ID: {element.id}</div>
			</CardFooter>
		</Card>
	);
};

export default EditComponent;
