"use client";

import { Input } from "@/components/ui/input";
import { useWebsiteBuilder } from "@/hooks/web-site-builder";
import { ComponentCategories } from "@/lib/web-site-builder/elements";
import { ChevronDown, ChevronRight, Layers, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import ElementButton from "../element-button";
import EditComponent from "./edit-component";
import SidebarActions from "./sidebar-actions";

const SidebarComponents = () => {
	const {
		state: {
			editor: { selectedElement },
		},
	} = useWebsiteBuilder();

	const [expandedCategory, setExpandedCategory] = useState<string | null>("hero");
	const [searchQuery, setSearchQuery] = useState("");

	const toggleCategory = (categoryId: string) => {
		setExpandedCategory((prev) => (prev === categoryId ? null : categoryId));
	};

	const isSearching = searchQuery.trim().length > 0;
	const normalizedQuery = searchQuery.trim().toLowerCase();

	const filteredCategories = useMemo(() => {
		if (!isSearching) return ComponentCategories;

		return ComponentCategories.map((category) => {
			const matchingElements = category.elements.filter((element) => {
				const label = element.elementButton.label.toLowerCase();
				const tooltip = (element.elementButton.tooltip || "").toLowerCase();
				return label.includes(normalizedQuery) || tooltip.includes(normalizedQuery);
			});
			return {
				...category,
				elements: matchingElements,
			};
		}).filter((category) => category.elements.length > 0);
	}, [isSearching, normalizedQuery]);

	const totalMatchingElements = useMemo(() => {
		return filteredCategories.reduce((acc, cat) => acc + cat.elements.length, 0);
	}, [filteredCategories]);

	return (
		<div className="fixed right-0 z-10 h-full w-72 border rounded-l-lg bg-background sm:static sm:w-auto overflow-y-auto">
			<div className="flex flex-col h-full gap-4 items-center justify-start py-2">
				<SidebarActions />
				{selectedElement && <EditComponent key={selectedElement.id} />}
				{!selectedElement && (
					<div className="w-full px-3 space-y-3">
						<div className="flex items-center gap-2 px-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
							<Layers className="h-4 w-4 text-primary" />
							<span>Categorias de Componentes</span>
						</div>

						{/* Campo de Busca de Componentes */}
						<div className="relative">
							<Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
							<Input
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Buscar componentes..."
								className="h-9 text-xs pl-8 pr-8 rounded-lg bg-muted/30 border-border/60 focus-visible:ring-1"
							/>
							{isSearching && (
								<button
									type="button"
									onClick={() => setSearchQuery("")}
									className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
									title="Limpar busca"
								>
									<X className="h-3.5 w-3.5" />
								</button>
							)}
						</div>

						{isSearching && (
							<div className="text-[11px] text-muted-foreground px-1">
								{totalMatchingElements > 0
									? `${totalMatchingElements} ${totalMatchingElements === 1 ? "componente encontrado" : "componentes encontrados"}`
									: "Nenhum componente encontrado"}
							</div>
						)}

						{/* Lista de Categorias e Componentes */}
						<div className="space-y-2.5">
							{filteredCategories.map((category) => {
								const isExpanded = isSearching || expandedCategory === category.id;
								const CategoryIcon = category.icon;

								return (
									<div
										key={category.id}
										className="border border-border/60 rounded-xl overflow-hidden bg-card shadow-sm transition-all duration-200"
									>
										<button
											type="button"
											onClick={() => toggleCategory(category.id)}
											className="w-full flex items-center justify-between p-3.5 text-sm font-medium hover:bg-accent/50 transition-colors text-left select-none"
										>
											<div className="flex items-center gap-2.5">
												<div className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary">
													<CategoryIcon className="h-4 w-4" />
												</div>
												<span className="font-semibold text-sm">{category.label}</span>
												<span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
													{category.elements.length}
												</span>
											</div>
											{isExpanded ? (
												<ChevronDown className="h-4 w-4 text-muted-foreground transition-transform" />
											) : (
												<ChevronRight className="h-4 w-4 text-muted-foreground transition-transform" />
											)}
										</button>

										{isExpanded && (
											<div className="p-3 pt-2 border-t border-border/40 bg-muted/10">
												<div className="grid grid-cols-2 gap-2.5 justify-items-stretch">
													{category.elements.map((element) => (
														<ElementButton key={element.type} element={element} />
													))}
												</div>
											</div>
										)}
									</div>
								);
							})}

							{isSearching && filteredCategories.length === 0 && (
								<div className="p-6 text-center rounded-xl border border-dashed border-border/80 bg-muted/20 space-y-2">
									<p className="text-xs text-muted-foreground">Nenhum componente corresponde a "{searchQuery}".</p>
									<button
										type="button"
										onClick={() => setSearchQuery("")}
										className="text-xs font-semibold text-primary hover:underline"
									>
										Limpar busca
									</button>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default SidebarComponents;
