"use client";

import { Button } from "@/components/ui/button";
import { useWebsiteBuilder } from "@/hooks/web-site-builder";
import { cn } from "@/lib/utils";
import { DeviceMode } from "@/types/web-site-builder";
import { ActionType, type ChangeDeviceMode } from "@/types/web-site-builder/actions";
import { ComputerIcon, SmartphoneIcon, TabletIcon } from "lucide-react";

const Preview = () => {
	const { state, dispatch } = useWebsiteBuilder();
	const { elements, deviceMode } = state.editor;
	const currentDevice = deviceMode || DeviceMode.Desktop;

	const handleDeviceChange = (mode: DeviceMode) => {
		const action: ChangeDeviceMode = {
			type: ActionType.ChangeDeviceMode,
			payload: {
				deviceMode: mode,
			},
		};
		dispatch(action);
	};

	return (
		<div className="flex flex-col flex-1 w-full min-h-screen bg-muted/20">
			{/* Top Preview Device Toolbar */}
			<div className="sticky top-0 z-30 flex items-center justify-center py-3 bg-background/90 backdrop-blur-md border-b">
				<div className="flex items-center gap-1.5 p-1 rounded-lg bg-muted/40 border border-border/80 shadow-sm">
					<Button
						variant={currentDevice === DeviceMode.Desktop ? "default" : "ghost"}
						size="sm"
						onClick={() => handleDeviceChange(DeviceMode.Desktop)}
						className="h-8 px-3 text-xs gap-1.5"
					>
						<ComputerIcon className="h-3.5 w-3.5" />
						<span>Desktop</span>
					</Button>
					<Button
						variant={currentDevice === DeviceMode.Tablet ? "default" : "ghost"}
						size="sm"
						onClick={() => handleDeviceChange(DeviceMode.Tablet)}
						className="h-8 px-3 text-xs gap-1.5"
					>
						<TabletIcon className="h-3.5 w-3.5" />
						<span>Tablet</span>
					</Button>
					<Button
						variant={currentDevice === DeviceMode.Mobile ? "default" : "ghost"}
						size="sm"
						onClick={() => handleDeviceChange(DeviceMode.Mobile)}
						className="h-8 px-3 text-xs gap-1.5"
					>
						<SmartphoneIcon className="h-3.5 w-3.5" />
						<span>Celular</span>
					</Button>
				</div>
			</div>

			{/* Responsive Preview Viewport */}
			<div className="flex flex-1 justify-center p-4 overflow-y-auto">
				<div
					className={cn(
						"bg-background transition-all duration-300 w-full min-h-full",
						currentDevice === DeviceMode.Desktop && "w-full shadow-sm",
						currentDevice === DeviceMode.Tablet &&
							"w-[768px] max-w-full rounded-2xl border-2 border-border shadow-xl my-4",
						currentDevice === DeviceMode.Mobile &&
							"w-[375px] max-w-full rounded-[2.5rem] border-4 border-muted-foreground/30 shadow-2xl my-4 overflow-hidden",
					)}
				>
					{currentDevice === DeviceMode.Mobile && (
						<div className="w-full flex justify-center pt-2 pb-1 bg-muted/40 border-b border-border/40">
							<div className="w-16 h-1 rounded-full bg-muted-foreground/40" />
						</div>
					)}
					{elements.length === 0 ? (
						<div className="p-12 text-center text-muted-foreground">Nenhum componente adicionado à página.</div>
					) : (
						elements.map((element) => {
							const LiveComponent = element.liveComponent;
							return <LiveComponent key={element.id} instance={element} />;
						})
					)}
				</div>
			</div>
		</div>
	);
};

export default Preview;
