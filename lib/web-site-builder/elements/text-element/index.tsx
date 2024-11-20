import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ElementActions from "@/components/web-site-builder/preview/element-actions";
import { useWebsiteBuilder } from "@/hooks/web-site-builder";
import { cn } from "@/lib/utils";
import { type Element, type ElementButton, type ElementProps, ElementType } from "@/types/web-site-builder";
import { ActionType, type UpdateElement } from "@/types/web-site-builder/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Text } from "lucide-react";

import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
const type: ElementType = ElementType.TextElement;
const customAttributes = {
	text: "Text element",
};

const elementButton: ElementButton = {
	icon: Text,
	label: "Text",
	tooltip: "Text Element",
};
const TextElement: Element = {
	constructor: function () {
		this.id = uuidv4();
		return { ...this };
	},
	id: uuidv4(),
	type,
	customAttributes,
	elementButton,
	previewComponent: PreviewComponent,
	editComponent: EditComponent,
	liveComponent: LiveComponent,
};

export { elementButton, TextElement };

function PreviewComponent({ instance, className, ...rest }: ElementProps) {
	const {
		state: {
			editor: { selectedElement },
		},
	} = useWebsiteBuilder();
	const {
		styles,
		customAttributes: { text },
	} = instance;

	//TODO: Understand why this classnames are not rendering events like hover
	return (
		<ElementActions element={instance}>
			<div
				{...rest}
				className={cn("m-2 p-2 border", className, {
					"border-green-500": !!selectedElement && instance.id === selectedElement.id,
				})}
			>
				{text}
			</div>
		</ElementActions>
	);
}

const TextElementSchema = z.object({
	text: z.string().min(1),
});

type FormValues = z.infer<typeof TextElementSchema>;

function EditComponent({ instance }: ElementProps) {
	const { dispatch } = useWebsiteBuilder();
	const {
		styles,
		customAttributes: { text },
	} = instance;

	const form = useForm<FormValues>({
		resolver: zodResolver(TextElementSchema),
		defaultValues: {
			text: text as string | "",
		},
		mode: "onBlur",
	});

	const onSubmit = async (values: FormValues) => {
		const { text } = values;
		const updatedElement = {
			...instance,
			customAttributes: {
				text,
			},
		};

		const myUpdateAction: UpdateElement = {
			type: ActionType.UpdateElement,
			payload: {
				element: updatedElement,
			},
		};
		dispatch(myUpdateAction);
	};

	return (
		<Form {...form}>
			<form onBlur={form.handleSubmit(onSubmit)} onSubmit={(e) => e.preventDefault()}>
				<FormField
					control={form.control}
					name="text"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{"Text"}</FormLabel>
							<FormControl>
								<Input
									placeholder="Text element"
									{...field}
									onKeyDown={(e) => {
										if (e.key === "Enter") e.currentTarget.blur();
									}}
								/>
							</FormControl>
							<FormDescription>{"Componente de texto"}</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}

function LiveComponent({ instance, className, ...rest }: ElementProps) {
	const {
		styles,
		customAttributes: { text },
	} = instance;
	return (
		<div {...rest} style={styles} className={cn(className)}>
			{text}
		</div>
	);
}
