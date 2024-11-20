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
		<Card>
			<CardHeader className="flex flex-row items-start bg-muted/50">
				<div className="grid gap-0.5">
					<CardTitle className="group flex items-center gap-2 text-lg">{element.type}</CardTitle>
					<CardDescription>{"Edite o texto"}</CardDescription>
				</div>
				<div className="ml-auto flex items-center gap-1">
					<Button onClick={handleUnselectElement} size="icon" variant="ghost" className="h-8 w-8">
						<SquareX className="h-3.5 w-3.5" />
					</Button>
				</div>
			</CardHeader>
			<CardContent className="p-6 text-sm">
				<div className="grid gap-3">
					<div className="font-semibold">{"Propriedades"}</div>
					<Separator className="my-2" />
					<Component instance={element} />
				</div>
			</CardContent>
			<CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
				<div className="text-xs text-muted-foreground">{element.id}</div>
			</CardFooter>
		</Card>
	);
};

export default EditComponent;
