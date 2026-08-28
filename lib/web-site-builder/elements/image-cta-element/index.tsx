"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import ElementActions from "@/components/web-site-builder/preview/element-actions";
import { useWebsiteBuilder } from "@/hooks/web-site-builder";
import { cn } from "@/lib/utils";
import { DeviceMode, type Element, type ElementButton, type ElementProps, ElementType } from "@/types/web-site-builder";
import { ActionType, type UpdateElement } from "@/types/web-site-builder/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const type: ElementType = ElementType.ImageCtaElement;

const customAttributes = {
	title: "Let's create more tools and ideas that brings us together.",
	subtitle:
		"Flowbite helps you connect with friends and communities of people who share your interests. Connecting with your friends and family as well as discovering new ones is easy with features like Groups.",
	ctaText: "Get started",
	ctaLink: "#",
	imageUrl: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg",
	imageAlt: "Dashboard preview",
	imagePosition: "left",
};

const elementButton: ElementButton = {
	icon: ImageIcon,
	label: "CTA com Imagem",
	tooltip: "CTA com ilustração/mockup e botão de ação",
};

const ImageCtaElement: Element = {
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

export { elementButton, ImageCtaElement };

function CtaContent({ instance }: { instance: Element }) {
	const { state } = useWebsiteBuilder();
	const deviceMode = state?.editor?.deviceMode || DeviceMode.Desktop;
	const isMobile = deviceMode === DeviceMode.Mobile;
	const isTablet = deviceMode === DeviceMode.Tablet;

	const {
		title = "Let's create more tools and ideas that brings us together.",
		subtitle = "Flowbite helps you connect with friends and communities of people who share your interests.",
		ctaText = "Get started",
		ctaLink = "#",
		imageUrl = "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg",
		imageAlt = "Dashboard preview",
		imagePosition = "left",
	} = instance.customAttributes;

	const isImageRight = imagePosition === "right";

	return (
		<section
			className={cn(
				"bg-white dark:bg-gray-900 w-full mx-auto transition-all",
				isMobile ? "py-8 px-4" : isTablet ? "py-12 px-6" : "py-16 px-12 max-w-screen-xl",
			)}
		>
			<div
				className={cn(
					"items-center mx-auto",
					isMobile ? "flex flex-col gap-6 text-center" : "grid md:grid-cols-2 gap-8 lg:gap-16",
				)}
			>
				<div className={cn("w-full flex justify-center", !isMobile && isImageRight && "md:order-2")}>
					<img
						src={
							String(imageUrl) || "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"
						}
						alt={String(imageAlt) || "Dashboard preview"}
						className={cn(
							"h-auto object-contain rounded-lg shadow-sm transition-all",
							isMobile ? "max-w-[220px]" : "w-full max-w-md md:max-w-full",
						)}
					/>
				</div>
				<div className={cn("w-full", !isMobile && isImageRight && "md:order-1", !isMobile && "text-left")}>
					<h2
						className={cn(
							"font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight",
							isMobile ? "text-2xl mb-3 max-w-xs mx-auto" : isTablet ? "text-3xl mb-4" : "text-4xl mb-4",
						)}
					>
						{String(title)}
					</h2>
					<p
						className={cn(
							"font-light text-gray-500 dark:text-gray-400 leading-relaxed",
							isMobile ? "text-xs sm:text-sm mb-6 max-w-xs mx-auto px-2" : isTablet ? "text-base mb-6" : "text-lg mb-6",
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
								<span>{String(ctaText)}</span>
								<svg
									aria-hidden="true"
									className="ml-2 w-4 h-4 shrink-0"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</a>
						</div>
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

const ImageCtaSchema = z.object({
	title: z.string().min(2, "Título deve ter pelo menos 2 caracteres"),
	subtitle: z.string().min(5, "Subtítulo deve ter pelo menos 5 caracteres"),
	ctaText: z.string().optional(),
	ctaLink: z.string().optional(),
	imageUrl: z.string().min(1, "URL da imagem é obrigatória"),
	imageAlt: z.string().optional(),
	imagePosition: z.enum(["left", "right"]).default("left"),
});

type FormValues = z.infer<typeof ImageCtaSchema>;

function EditComponent({ instance }: ElementProps) {
	const { dispatch } = useWebsiteBuilder();
	const {
		title = "Let's create more tools and ideas that brings us together.",
		subtitle = "Flowbite helps you connect with friends and communities of people who share your interests.",
		ctaText = "Get started",
		ctaLink = "#",
		imageUrl = "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg",
		imageAlt = "Dashboard preview",
		imagePosition = "left",
	} = instance.customAttributes;

	const form = useForm<FormValues>({
		resolver: zodResolver(ImageCtaSchema),
		defaultValues: {
			title: String(title ?? ""),
			subtitle: String(subtitle ?? ""),
			ctaText: String(ctaText ?? ""),
			ctaLink: String(ctaLink ?? ""),
			imageUrl: String(imageUrl ?? ""),
			imageAlt: String(imageAlt ?? "Dashboard preview"),
			imagePosition: (imagePosition as "left" | "right") ?? "left",
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
				<div className="font-semibold text-sm border-b pb-2 text-foreground">Configurações do CTA com Imagem</div>

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
										<Input placeholder="Ex: Get started" {...field} />
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

				<div className="border-t pt-3 space-y-3">
					<div className="text-xs font-semibold uppercase text-muted-foreground">Imagem e Alinhamento</div>
					<FormField
						control={form.control}
						name="imageUrl"
						render={({ field }) => (
							<FormItem>
								<FormLabel>URL da Imagem</FormLabel>
								<FormControl>
									<Input placeholder="https://..." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="imageAlt"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Texto Alternativo (Alt)</FormLabel>
								<FormControl>
									<Input placeholder="Descrição da imagem" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="imagePosition"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Posição da Imagem</FormLabel>
								<Select
									onValueChange={(val) => {
										field.onChange(val);
										form.handleSubmit(onSubmit)();
									}}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Selecione a posição" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="left">Esquerda</SelectItem>
										<SelectItem value="right">Direita</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</form>
		</Form>
	);
}
