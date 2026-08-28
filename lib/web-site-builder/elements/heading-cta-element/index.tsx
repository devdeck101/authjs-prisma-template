"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ElementActions from "@/components/web-site-builder/preview/element-actions";
import { useWebsiteBuilder } from "@/hooks/web-site-builder";
import { cn } from "@/lib/utils";
import { DeviceMode, type Element, type ElementButton, type ElementProps, ElementType } from "@/types/web-site-builder";
import { ActionType, type UpdateElement } from "@/types/web-site-builder/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { MousePointerClick } from "lucide-react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const type: ElementType = ElementType.HeadingCtaElement;

const customAttributes = {
	title: "Start your free trial today",
	subtitle: "Try Flowbite Platform for 30 days. No credit card required.",
	ctaText: "Free trial for 30 days",
	ctaLink: "#",
};

const elementButton: ElementButton = {
	icon: MousePointerClick,
	label: "CTA Centralizado",
	tooltip: "CTA minimalista centralizado com botão em destaque",
};

const HeadingCtaElement: Element = {
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

export { elementButton, HeadingCtaElement };

function CtaContent({ instance }: { instance: Element }) {
	const { state } = useWebsiteBuilder();
	const deviceMode = state?.editor?.deviceMode || DeviceMode.Desktop;
	const isMobile = deviceMode === DeviceMode.Mobile;
	const isTablet = deviceMode === DeviceMode.Tablet;

	const {
		title = "Start your free trial today",
		subtitle = "Try Flowbite Platform for 30 days. No credit card required.",
		ctaText = "Free trial for 30 days",
		ctaLink = "#",
	} = instance.customAttributes;

	return (
		<section
			className={cn(
				"bg-white dark:bg-gray-900 w-full mx-auto transition-all text-center",
				isMobile ? "py-8 px-4" : isTablet ? "py-12 px-6" : "py-16 px-12 max-w-screen-xl",
			)}
		>
			<div className="mx-auto max-w-screen-sm text-center">
				<h2
					className={cn(
						"font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white",
						isMobile ? "text-2xl mb-3" : isTablet ? "text-3xl mb-4" : "text-4xl mb-4",
					)}
				>
					{String(title)}
				</h2>
				<p
					className={cn(
						"font-light text-gray-500 dark:text-gray-400 leading-relaxed",
						isMobile ? "text-xs sm:text-sm mb-6 px-2" : isTablet ? "text-base mb-6" : "text-lg mb-6",
					)}
				>
					{String(subtitle)}
				</p>
				{Boolean(ctaText) && (
					<div className={cn(isMobile && "flex justify-center")}>
						<a
							href={String(ctaLink) || "#"}
							className={cn(
								"inline-flex items-center justify-center text-primary-foreground bg-primary hover:bg-primary/90 font-medium rounded-lg shadow-sm transition-colors",
								isMobile ? "w-full max-w-xs py-2.5 px-4 text-sm" : "px-5 py-2.5 text-sm",
							)}
						>
							{String(ctaText)}
						</a>
					</div>
				)}
			</div>
		</section>
	);
}

function PreviewComponent({ instance, className, ...rest }: ElementProps) {
	return (
		<ElementActions element={instance}>
			<div {...rest} className={cn("w-full", className)} style={instance.styles}>
				<CtaContent instance={instance} />
			</div>
		</ElementActions>
	);
}

function LiveComponent({ instance, className, ...rest }: ElementProps) {
	return (
		<div {...rest} className={cn("w-full", className)} style={instance.styles}>
			<CtaContent instance={instance} />
		</div>
	);
}

const HeadingCtaSchema = z.object({
	title: z.string().min(2, "Título deve ter pelo menos 2 caracteres"),
	subtitle: z.string().min(5, "Subtítulo deve ter pelo menos 5 caracteres"),
	ctaText: z.string().optional(),
	ctaLink: z.string().optional(),
});

type FormValues = z.infer<typeof HeadingCtaSchema>;

function EditComponent({ instance }: ElementProps) {
	const { dispatch } = useWebsiteBuilder();
	const {
		title = "Start your free trial today",
		subtitle = "Try Flowbite Platform for 30 days. No credit card required.",
		ctaText = "Free trial for 30 days",
		ctaLink = "#",
	} = instance.customAttributes;

	const form = useForm<FormValues>({
		resolver: zodResolver(HeadingCtaSchema),
		defaultValues: {
			title: String(title ?? ""),
			subtitle: String(subtitle ?? ""),
			ctaText: String(ctaText ?? ""),
			ctaLink: String(ctaLink ?? ""),
		},
		mode: "onBlur",
	});

	const onSubmit = (values: FormValues) => {
		const updatedElement = {
			...instance,
			customAttributes: {
				...values,
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
			<form
				onBlur={form.handleSubmit(onSubmit)}
				onSubmit={(event) => {
					event.preventDefault();
					form.handleSubmit(onSubmit)();
				}}
				className="space-y-4 px-1 w-full"
			>
				<div className="font-semibold text-sm border-b pb-2 text-foreground">Configurações do CTA Centralizado</div>

				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Título Principal</FormLabel>
							<FormControl>
								<Input
									placeholder="Título do CTA"
									{...field}
									onKeyDown={(event) => {
										if (event.key === "Enter") event.currentTarget.blur();
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="subtitle"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Subtítulo / Descrição</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Descrição do CTA"
									rows={3}
									{...field}
									onKeyDown={(event) => {
										if (event.key === "Enter" && !event.shiftKey) event.currentTarget.blur();
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="border-t pt-3 space-y-3">
					<div className="text-xs font-semibold uppercase text-muted-foreground">Botão de Ação (CTA)</div>
					<div className="grid grid-cols-2 gap-2">
						<FormField
							control={form.control}
							name="ctaText"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Texto do Botão</FormLabel>
									<FormControl>
										<Input placeholder="Ex: Free trial" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="ctaLink"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Link do Botão</FormLabel>
									<FormControl>
										<Input placeholder="#" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
			</form>
		</Form>
	);
}
