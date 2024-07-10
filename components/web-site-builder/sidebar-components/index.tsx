"use client";

import { useWebsiteBuilder } from "@/hooks/web-site-builder";
import { ElementImpl } from "@/lib/web-site-builder/elements";

import ElementButton from "../element-button";
import EditComponent from "./edit-component";
import SidebarActions from "./sidebar-actions";

const SidebarComponents = () => {
	const {
		state: {
			editor: { selectedElement },
		},
	} = useWebsiteBuilder();

	return (
		<div className="fixed right-0 z-10 h-full w-64 border rounded-l-lg bg-background sm:static sm:w-auto">
			{/* <div className="flex h-full flex-col gap-4  justify-start"> */}
			<div className="flex flex-col h-full gap-4  items-center justify-start">
				<SidebarActions />
				{selectedElement && <EditComponent key={selectedElement.id} />}
				{!selectedElement && (
					<div className="grid grid-cols-2 space-x-4">
						<ElementButton element={ElementImpl.TextElement} />
						<ElementButton element={ElementImpl.ContainerElement} />
					</div>
				)}
			</div>
		</div>
	);
};

export default SidebarComponents;
