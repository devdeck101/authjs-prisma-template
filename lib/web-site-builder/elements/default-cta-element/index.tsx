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
import { Megaphone } from "lucide-react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const type: ElementType = ElementType.DefaultCtaElement;

const customAttributes = {
	title: "Let's find more that brings us together.",
	subtitle:
		"Flowbite helps you connect with friends, family and communities of people who share your interests. Connecting with your friends and family as well as discovering new ones is easy with features like Groups, Watch and Marketplace.",
	primaryCtaText: "Get started",
	primaryCtaLink: "#",
	secondaryCtaText: "View more",
	secondaryCtaLink: "#",
};

const elementButton: ElementButton = {
	icon: Megaphone,
	label: "CTA Padrão",
	tooltip: "CTA com título, texto e dois botões de ação",
};

const DefaultCtaElement: Element = {
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

export { elementButton, DefaultCtaElement };

function CtaContent({ instance }: { instance: Element }) {
	const { state } = useWebsiteBuilder();
	const deviceMode = state?.editor?.deviceMode || DeviceMode.Desktop;
	const isMobile = deviceMode === DeviceMode.Mobile;
	const isTablet = deviceMode === DeviceMode.Tablet;

	const {
		title = "Let's find more that brings us together.",
		subtitle = "Flowbite helps you connect with friends, family and communities of people who share your interests.",
		primaryCtaText = "Get started",
		primaryCtaLink = "#",
		secondaryCtaText = "View more",
		secondaryCtaLink = "#",
	} = instance.customAttributes;

	return (
		<section
			className={cn(
				"bg-white dark:bg-gray-900 w-full mx-auto transition-all",
				isMobile ? "py-8 px-4 text-center" : isTablet ? "py-12 px-6" : "py-16 px-12 max-w-screen-xl",
			)}
		>
			<div className={cn("max-w-screen-md", isMobile && "mx-auto")}>
				<h2
					className={cn(
						"font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight",
						isMobile ? "text-2xl mb-3" : isTablet ? "text-3xl mb-4" : "text-4xl mb-4",
					)}
				>
					{String(title)}
				</h2>
				<p
					className={cn(
						"font-light text-gray-500 dark:text-gray-400 leading-relaxed",
						isMobile ? "text-xs sm:text-sm mb-6" : isTablet ? "text-base mb-8" : "text-xl mb-8",
					)}
				>
					{String(subtitle)}
				</p>
				<div
					className={cn("flex items-center", isMobile ? "flex-col gap-3 w-full max-w-xs mx-auto" : "flex-row gap-4")}
				>
					{Boolean(primaryCtaText) && (
						<a
							href={String(primaryCtaLink) || "#"}
							className={cn(
								"inline-flex items-center justify-center font-medium text-center text-primary-foreground rounded-lg bg-primary hover:bg-primary/90 shadow-sm transition-colors",
								isMobile ? "w-full py-2.5 px-4 text-sm" : "px-4 py-2.5 text-base",
							)}
						>
							{String(primaryCtaText)}
						</a>
					)}
					{Boolean(secondaryCtaText) && (
						<a
							href={String(secondaryCtaLink) || "#"}
							className={cn(
								"inline-flex items-center justify-center font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 transition-colors",
								isMobile ? "w-full py-2.5 px-4 text-sm" : "px-4 py-2.5 text-base",
							)}
						>
							<svg
								aria-hidden="true"
								className="mr-2 w-4 h-4 shrink-0"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
							</svg>
							{String(secondaryCtaText)}
						</a>
					)}
				</div>
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

const DefaultCtaSchema = z.object({
	title: z.string().min(2, "Título deve ter pelo menos 2 caracteres"),
	subtitle: z.string().min(5, "Subtítulo deve ter pelo menos 5 caracteres"),
	primaryCtaText: z.string().optional(),
	primaryCtaLink: z.string().optional(),
	secondaryCtaText: z.string().optional(),
	secondaryCtaLink: z.string().optional(),
});

type FormValues = z.infer<typeof DefaultCtaSchema>;

function EditComponent({ instance }: ElementProps) {
	const { dispatch } = useWebsiteBuilder();
	const {
		title = "Let's find more that brings us together.",
		subtitle = "Flowbite helps you connect with friends, family and communities of people who share your interests.",
		primaryCtaText = "Get started",
		primaryCtaLink = "#",
		secondaryCtaText = "View more",
		secondaryCtaLink = "#",
	} = instance.customAttributes;

	const form = useForm<FormValues>({
		resolver: zodResolver(DefaultCtaSchema),
		defaultValues: {
			title: String(title ?? ""),
			subtitle: String(subtitle ?? ""),
			primaryCtaText: String(primaryCtaText ?? ""),
			primaryCtaLink: String(primaryCtaLink ?? ""),
			secondaryCtaText: String(secondaryCtaText ?? ""),
			secondaryCtaLink: String(secondaryCtaLink ?? ""),
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
				<div className="font-semibold text-sm border-b pb-2 text-foreground">Configurações do CTA Padrão</div>

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
					<div className="text-xs font-semibold uppercase text-muted-foreground">Botões de Ação (CTAs)</div>
					<div className="grid grid-cols-2 gap-2">
						<FormField
							control={form.control}
							name="primaryCtaText"
							render={({ field }) => (
								<FormItem>
									<FormLabel>CTA Primário</FormLabel>
									<FormControl>
										<Input placeholder="Ex: Get started" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="primaryCtaLink"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Link Primário</FormLabel>
									<FormControl>
										<Input placeholder="#" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="grid grid-cols-2 gap-2">
						<FormField
							control={form.control}
							name="secondaryCtaText"
							render={({ field }) => (
								<FormItem>
									<FormLabel>CTA Secundário</FormLabel>
									<FormControl>
										<Input placeholder="Ex: View more" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="secondaryCtaLink"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Link Secundário</FormLabel>
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
