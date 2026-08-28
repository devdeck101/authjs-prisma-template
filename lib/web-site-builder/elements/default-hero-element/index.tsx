"use client";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import ElementActions from "@/components/web-site-builder/preview/element-actions";
import { useWebsiteBuilder } from "@/hooks/web-site-builder";
import { cn } from "@/lib/utils";
import { DeviceMode, type Element, type ElementButton, type ElementProps, ElementType } from "@/types/web-site-builder";
import { ActionType, type UpdateElement } from "@/types/web-site-builder/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const type: ElementType = ElementType.DefaultHeroElement;

const customAttributes = {
	badgeText: "New",
	badgeMessage: "Flowbite is out! See what is new",
	badgeLink: "#",
	title: "We invest in the world's potential",
	subtitle:
		"Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.",
	primaryCtaText: "Learn more",
	primaryCtaLink: "#",
	secondaryCtaText: "Watch video",
	secondaryCtaLink: "#",
	showFeaturedLogos: true,
};

const elementButton: ElementButton = {
	icon: Sparkles,
	label: "Hero Padrão",
	tooltip: "Hero com anúncio, CTAs e marcas parceiras",
};

const DefaultHeroElement: Element = {
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

export { elementButton, DefaultHeroElement };

function HeroContent({ instance }: { instance: Element }) {
	const { state } = useWebsiteBuilder();
	const deviceMode = state?.editor?.deviceMode || DeviceMode.Desktop;
	const isMobile = deviceMode === DeviceMode.Mobile;
	const isTablet = deviceMode === DeviceMode.Tablet;

	const {
		badgeText = "New",
		badgeMessage = "Flowbite is out! See what is new",
		badgeLink = "#",
		title = "We invest in the world's potential",
		subtitle = "Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.",
		primaryCtaText = "Learn more",
		primaryCtaLink = "#",
		secondaryCtaText = "Watch video",
		secondaryCtaLink = "#",
		showFeaturedLogos = true,
	} = instance.customAttributes;

	return (
		<section
			className={cn(
				"bg-white dark:bg-gray-900 w-full mx-auto text-center transition-all",
				isMobile ? "py-8 px-4" : isTablet ? "py-12 px-6" : "py-16 px-12 max-w-screen-xl",
			)}
		>
			{/* Badge */}
			{Boolean(badgeMessage) && (
				<div className="flex justify-center mb-5">
					<a
						href={String(badgeLink) || "#"}
						className={cn(
							"inline-flex items-center text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
							isMobile ? "py-1 px-3 text-xs max-w-full" : "py-1.5 px-4 text-sm",
						)}
					>
						{Boolean(badgeText) && (
							<span className="text-[10px] sm:text-xs bg-primary text-primary-foreground rounded-full px-2.5 py-0.5 mr-2 font-semibold shrink-0">
								{String(badgeText)}
							</span>
						)}
						<span className="font-medium truncate">{String(badgeMessage)}</span>
						<svg
							aria-hidden="true"
							className="ml-2 w-4 h-4 shrink-0"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					</a>
				</div>
			)}

			{/* Título Principal */}
			<h1
				className={cn(
					"font-extrabold tracking-tight text-gray-900 dark:text-white mx-auto leading-tight text-center",
					isMobile
						? "text-2xl mb-4 max-w-xs"
						: isTablet
							? "text-4xl mb-5 max-w-xl"
							: "text-5xl lg:text-6xl mb-6 max-w-4xl",
				)}
			>
				{String(title)}
			</h1>

			{/* Subtítulo / Descrição */}
			<p
				className={cn(
					"font-normal text-gray-500 dark:text-gray-400 mx-auto text-center leading-relaxed",
					isMobile
						? "text-xs sm:text-sm mb-6 max-w-xs px-2"
						: isTablet
							? "text-base mb-8 max-w-lg px-4"
							: "text-lg lg:text-xl mb-10 max-w-3xl px-6",
				)}
			>
				{String(subtitle)}
			</p>

			{/* Botões de Ação (CTAs) */}
			<div
				className={cn(
					"flex items-center justify-center mx-auto",
					isMobile ? "flex-col gap-3 w-full max-w-xs mb-8" : "flex-row gap-4 w-auto mb-12",
				)}
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
				)}
				{Boolean(secondaryCtaText) && (
					<a
						href={String(secondaryCtaLink) || "#"}
						className={cn(
							"inline-flex items-center justify-center font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-800 transition-colors",
							isMobile ? "w-full py-2.5 px-4 text-sm" : "py-3 px-5 text-base",
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
						<span>{String(secondaryCtaText)}</span>
					</a>
				)}
			</div>

			{/* Logotipos ("FEATURED IN") */}
			{Boolean(showFeaturedLogos) && (
				<div className={cn("mx-auto text-center", isMobile ? "max-w-xs" : "max-w-2xl")}>
					<span className="font-semibold text-gray-400 uppercase text-[10px] tracking-wider block mb-4">
						FEATURED IN
					</span>
					<div
						className={cn(
							"items-center text-gray-500 opacity-75 font-bold",
							isMobile
								? "grid grid-cols-2 gap-3 text-xs"
								: isTablet
									? "flex justify-between gap-6 text-base"
									: "flex justify-between gap-8 text-lg",
						)}
					>
						<span>YouTube</span>
						<span>Product Hunt</span>
						<span>Reddit</span>
						<span>Mashable</span>
					</div>
				</div>
			)}
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

const DefaultHeroSchema = z.object({
	badgeText: z.string().optional(),
	badgeMessage: z.string().optional(),
	badgeLink: z.string().optional(),
	title: z.string().min(2, "Título deve ter pelo menos 2 caracteres"),
	subtitle: z.string().min(5, "Subtítulo deve ter pelo menos 5 caracteres"),
	primaryCtaText: z.string().optional(),
	primaryCtaLink: z.string().optional(),
	secondaryCtaText: z.string().optional(),
	secondaryCtaLink: z.string().optional(),
	showFeaturedLogos: z.boolean().default(true),
});

type FormValues = z.infer<typeof DefaultHeroSchema>;

function EditComponent({ instance }: ElementProps) {
	const { dispatch } = useWebsiteBuilder();
	const {
		badgeText = "New",
		badgeMessage = "Flowbite is out! See what is new",
		badgeLink = "#",
		title = "We invest in the world's potential",
		subtitle = "Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.",
		primaryCtaText = "Learn more",
		primaryCtaLink = "#",
		secondaryCtaText = "Watch video",
		secondaryCtaLink = "#",
		showFeaturedLogos = true,
	} = instance.customAttributes;

	const form = useForm<FormValues>({
		resolver: zodResolver(DefaultHeroSchema),
		defaultValues: {
			badgeText: String(badgeText ?? ""),
			badgeMessage: String(badgeMessage ?? ""),
			badgeLink: String(badgeLink ?? ""),
			title: String(title ?? ""),
			subtitle: String(subtitle ?? ""),
			primaryCtaText: String(primaryCtaText ?? ""),
			primaryCtaLink: String(primaryCtaLink ?? ""),
			secondaryCtaText: String(secondaryCtaText ?? ""),
			secondaryCtaLink: String(secondaryCtaLink ?? ""),
			showFeaturedLogos: Boolean(showFeaturedLogos),
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
				<div className="font-semibold text-sm border-b pb-2 text-foreground">Configurações do Hero Padrão</div>

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
					<div className="text-xs font-semibold uppercase text-muted-foreground">Badge de Anúncio</div>
					<FormField
						control={form.control}
						name="badgeText"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Texto da Tag</FormLabel>
								<FormControl>
									<Input placeholder="Ex: Novo" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="badgeMessage"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Mensagem do Badge</FormLabel>
								<FormControl>
									<Input placeholder="Mensagem de novidade" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="badgeLink"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Link do Badge</FormLabel>
								<FormControl>
									<Input placeholder="#" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

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
										<Input placeholder="Ex: Saiba mais" {...field} />
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
										<Input placeholder="Ex: Assistir vídeo" {...field} />
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

				<div className="border-t pt-3 space-y-2">
					<FormField
						control={form.control}
						name="showFeaturedLogos"
						render={({ field }) => (
							<FormItem className="flex items-center justify-between rounded-lg border p-3">
								<div className="space-y-0.5">
									<FormLabel className="text-sm font-medium">Logotipos de Parceiros</FormLabel>
									<FormDescription className="text-xs">Exibir seção "FEATURED IN"</FormDescription>
								</div>
								<FormControl>
									<Switch
										checked={field.value}
										onCheckedChange={(checked) => {
											field.onChange(checked);
											form.handleSubmit(onSubmit)();
										}}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
			</form>
		</Form>
	);
}
