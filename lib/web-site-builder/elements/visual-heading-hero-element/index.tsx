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
import { ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const type: ElementType = ElementType.VisualHeadingHeroElement;

const customAttributes = {
	title: "Payments tool for software companies",
	subtitle:
		"From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack.",
	primaryCtaText: "Get started",
	primaryCtaLink: "#",
	secondaryCtaText: "Speak to Sales",
	secondaryCtaLink: "#",
	imageUrl: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png",
	imageAlt: "mockup",
};

const elementButton: ElementButton = {
	icon: ImageIcon,
	label: "Hero Imagem",
	tooltip: "Hero com imagem lateral e CTAs",
};

const VisualHeadingHeroElement: Element = {
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

export { elementButton, VisualHeadingHeroElement };

function HeroContent({ instance }: { instance: Element }) {
	const { state } = useWebsiteBuilder();
	const deviceMode = state?.editor?.deviceMode || DeviceMode.Desktop;
	const isMobile = deviceMode === DeviceMode.Mobile;
	const isTablet = deviceMode === DeviceMode.Tablet;

	const {
		title = "Payments tool for software companies",
		subtitle = "From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack.",
		primaryCtaText = "Get started",
		primaryCtaLink = "#",
		secondaryCtaText = "Speak to Sales",
		secondaryCtaLink = "#",
		imageUrl = "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png",
		imageAlt = "mockup",
	} = instance.customAttributes;

	return (
		<section
			className={cn(
				"bg-white dark:bg-gray-900 w-full mx-auto transition-all",
				isMobile ? "py-8 px-4" : isTablet ? "py-12 px-6" : "py-16 px-12 max-w-screen-xl",
			)}
		>
			<div
				className={cn(
					"mx-auto items-center",
					isMobile ? "flex flex-col gap-6 text-center" : "grid lg:grid-cols-12 gap-8",
				)}
			>
				<div className={cn("w-full", !isMobile && "lg:col-span-7 text-left")}>
					<h1
						className={cn(
							"font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight",
							isMobile
								? "text-2xl mb-3 max-w-xs mx-auto"
								: isTablet
									? "text-4xl mb-4"
									: "text-5xl lg:text-6xl mb-4 max-w-2xl",
						)}
					>
						{String(title)}
					</h1>
					<p
						className={cn(
							"font-light text-gray-500 dark:text-gray-400 leading-relaxed",
							isMobile
								? "text-xs sm:text-sm mb-6 max-w-xs mx-auto px-2"
								: isTablet
									? "text-base mb-6"
									: "text-lg lg:text-xl mb-8 max-w-2xl",
						)}
					>
						{String(subtitle)}
					</p>
					<div
						className={cn("flex items-center", isMobile ? "flex-col gap-3 w-full max-w-xs mx-auto" : "flex-row gap-3")}
					>
						{Boolean(primaryCtaText) && (
							<a
								href={String(primaryCtaLink) || "#"}
								className={cn(
									"inline-flex items-center justify-center font-medium text-center text-primary-foreground rounded-lg bg-primary hover:bg-primary/90 shadow-sm transition-colors",
									isMobile ? "w-full py-2.5 px-4 text-sm" : "py-3 px-5 text-base",
								)}
							>
								<span>{String(primaryCtaText)}</span>
								<svg
									aria-hidden="true"
									className="w-4 h-4 ml-2 -mr-1 shrink-0"
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
						)}
						{Boolean(secondaryCtaText) && (
							<a
								href={String(secondaryCtaLink) || "#"}
								className={cn(
									"inline-flex items-center justify-center font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-800 transition-colors",
									isMobile ? "w-full py-2.5 px-4 text-sm" : "py-3 px-5 text-base",
								)}
							>
								{String(secondaryCtaText)}
							</a>
						)}
					</div>
				</div>
				<div className={cn("flex justify-center w-full", !isMobile && "lg:col-span-5")}>
					<img
						src={String(imageUrl) || "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"}
						alt={String(imageAlt) || "mockup"}
						className={cn(
							"h-auto object-contain rounded-lg shadow-md transition-all",
							isMobile ? "max-w-[220px]" : "max-w-full",
						)}
					/>
				</div>
			</div>
		</section>
	);
}

function PreviewComponent({ instance, className, ...rest }: ElementProps) {
	return (
		<ElementActions element={instance}>
			<div {...rest} className={cn("w-full", className)} style={instance.styles}>
				<HeroContent instance={instance} />
			</div>
		</ElementActions>
	);
}

function LiveComponent({ instance, className, ...rest }: ElementProps) {
	return (
		<div {...rest} className={cn("w-full", className)} style={instance.styles}>
			<HeroContent instance={instance} />
		</div>
	);
}

const VisualHeadingHeroSchema = z.object({
	title: z.string().min(2, "Título deve ter pelo menos 2 caracteres"),
	subtitle: z.string().min(5, "Subtítulo deve ter pelo menos 5 caracteres"),
	primaryCtaText: z.string().optional(),
	primaryCtaLink: z.string().optional(),
	secondaryCtaText: z.string().optional(),
	secondaryCtaLink: z.string().optional(),
	imageUrl: z.string().min(1, "URL da imagem é obrigatória"),
	imageAlt: z.string().optional(),
});

type FormValues = z.infer<typeof VisualHeadingHeroSchema>;

function EditComponent({ instance }: ElementProps) {
	const { dispatch } = useWebsiteBuilder();
	const {
		title = "Payments tool for software companies",
		subtitle = "From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack.",
		primaryCtaText = "Get started",
		primaryCtaLink = "#",
		secondaryCtaText = "Speak to Sales",
		secondaryCtaLink = "#",
		imageUrl = "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png",
		imageAlt = "mockup",
	} = instance.customAttributes;

	const form = useForm<FormValues>({
		resolver: zodResolver(VisualHeadingHeroSchema),
		defaultValues: {
			title: String(title ?? ""),
			subtitle: String(subtitle ?? ""),
			primaryCtaText: String(primaryCtaText ?? ""),
			primaryCtaLink: String(primaryCtaLink ?? ""),
			secondaryCtaText: String(secondaryCtaText ?? ""),
			secondaryCtaLink: String(secondaryCtaLink ?? ""),
			imageUrl: String(imageUrl ?? ""),
			imageAlt: String(imageAlt ?? "mockup"),
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
				<div className="font-semibold text-sm border-b pb-2 text-foreground">Configurações do Hero com Imagem</div>

				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Título Principal</FormLabel>
							<FormControl>
								<Input
									placeholder="Título do Hero"
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
									placeholder="Descrição do Hero"
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
										<Input placeholder="Ex: Falar com vendas" {...field} />
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

				<div className="border-t pt-3 space-y-3">
					<div className="text-xs font-semibold uppercase text-muted-foreground">Imagem Lateral</div>
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
				</div>
			</form>
		</Form>
	);
}
