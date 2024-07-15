import { Button } from "@/components/ui/button";
import Canvas from "@/components/web-site-builder/canva";
import {
	CodeIcon,
	ComputerIcon,
	LayersIcon,
	LayoutGridIcon,
	PaletteIcon,
	SmartphoneIcon,
	TabletIcon,
} from "lucide-react";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import SidebarComponents from "../sidebar-components";

interface Props extends PropsWithChildren {}

const Main = (props: Props) => {
	return (
		<div className="flex-1 overflow-auto ">
			<div className="grid h-full w-full grid-cols-[1fr_260px] gap-4">
				<div className="flex flex-col gap-1 rounded-lg border bg-muted/40">
					<div className="mx-auto my-2 flex items-center gap-2">
						<Button variant="outline" size="icon" className="hidden sm:inline-flex">
							<ComputerIcon className="h-5 w-5" />
							<span className="sr-only">Desktop view</span>
						</Button>
						<Button variant="outline" size="icon" className="hidden sm:inline-flex">
							<TabletIcon className="h-5 w-5" />
							<span className="sr-only">Tablet view</span>
						</Button>
						<Button variant="outline" size="icon" className="hidden sm:inline-flex">
							<SmartphoneIcon className="h-5 w-5" />
							<span className="sr-only">Mobile view</span>
						</Button>
					</div>
					<div className="flex flex-1 border bg-background m-2">
						<Canvas />
					</div>
				</div>
				<SidebarComponents />
			</div>
		</div>
	);
};

export default Main;
