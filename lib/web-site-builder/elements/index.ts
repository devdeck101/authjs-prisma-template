import { ContainerElement } from "@/lib/web-site-builder/elements/container-element";
import { DefaultCtaElement } from "@/lib/web-site-builder/elements/default-cta-element";
import { DefaultHeroElement } from "@/lib/web-site-builder/elements/default-hero-element";
import { HeadingCtaElement } from "@/lib/web-site-builder/elements/heading-cta-element";
import { ImageCtaElement } from "@/lib/web-site-builder/elements/image-cta-element";
import { SimpleBannerElement } from "@/lib/web-site-builder/elements/simple-banner-element";
import { TextElement } from "@/lib/web-site-builder/elements/text-element";
import { VisualHeadingHeroElement } from "@/lib/web-site-builder/elements/visual-heading-hero-element";
import type { ComponentCategory, ElementTypes } from "@/types/web-site-builder";
import { Megaphone, Sparkles, TypeIcon } from "lucide-react";

export const ElementImpl: ElementTypes = {
	TextElement: TextElement,
	ContainerElement: ContainerElement,
	SimpleBannerElement: SimpleBannerElement,
	DefaultHeroElement: DefaultHeroElement,
	VisualHeadingHeroElement: VisualHeadingHeroElement,
	DefaultCtaElement: DefaultCtaElement,
	ImageCtaElement: ImageCtaElement,
	HeadingCtaElement: HeadingCtaElement,
};

export const ComponentCategories: ComponentCategory[] = [
	{
		id: "hero",
		label: "Hero",
		icon: Sparkles,
		elements: [DefaultHeroElement, VisualHeadingHeroElement],
	},
	{
		id: "cta",
		label: "CTA",
		icon: Megaphone,
		elements: [DefaultCtaElement, ImageCtaElement, HeadingCtaElement],
	},
	{
		id: "basics",
		label: "Básicos",
		icon: TypeIcon,
		elements: [TextElement, SimpleBannerElement],
	},
];
