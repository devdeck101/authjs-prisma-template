"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Canvas from "@/components/web-site-builder/canva";
import { useWebsiteBuilder } from "@/hooks/web-site-builder";
import { cn } from "@/lib/utils";
import { DeviceMode } from "@/types/web-site-builder";
import { ActionType, type ChangeDeviceMode } from "@/types/web-site-builder/actions";
import { ComputerIcon, SmartphoneIcon, TabletIcon } from "lucide-react";
import type { PropsWithChildren } from "react";
import SidebarComponents from "../sidebar-components";

interface Props extends PropsWithChildren {}

const Main = (props: Props) => {
	const { state, dispatch } = useWebsiteBuilder();
	const currentDevice = state.editor.deviceMode || DeviceMode.Desktop;

	const handleDeviceChange = (deviceMode: DeviceMode) => {
		const action: ChangeDeviceMode = {
			type: ActionType.ChangeDeviceMode,
			payload: {
				deviceMode,
			},
		};
		dispatch(action);
	};

	return (
		<div className="flex-1 overflow-auto h-full flex flex-col">
			<div className="grid h-full w-full grid-cols-[1fr_288px] gap-4">
				<div className="flex flex-col gap-1 rounded-lg border bg-muted/30 overflow-hidden h-full">
					{/* Top Device Mode Toolbar */}
					<div className="mx-auto my-2 flex items-center gap-1.5 p-1 rounded-lg bg-background border border-border/80 shadow-sm shrink-0">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant={currentDevice === DeviceMode.Desktop ? "default" : "ghost"}
										size="icon"
										onClick={() => handleDeviceChange(DeviceMode.Desktop)}
										className={cn(
											"h-8 w-8 transition-colors",
											currentDevice === DeviceMode.Desktop
												? "bg-primary text-primary-foreground"
												: "text-muted-foreground hover:text-foreground",
										)}
									>
										<ComputerIcon className="h-4 w-4" />
										<span className="sr-only">Visualização Desktop</span>
									</Button>
								</TooltipTrigger>
								<TooltipContent side="bottom">Desktop (Computador)</TooltipContent>
							</Tooltip>

							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant={currentDevice === DeviceMode.Tablet ? "default" : "ghost"}
										size="icon"
										onClick={() => handleDeviceChange(DeviceMode.Tablet)}
										className={cn(
											"h-8 w-8 transition-colors",
											currentDevice === DeviceMode.Tablet
												? "bg-primary text-primary-foreground"
												: "text-muted-foreground hover:text-foreground",
										)}
									>
										<TabletIcon className="h-4 w-4" />
										<span className="sr-only">Visualização Tablet</span>
									</Button>
								</TooltipTrigger>
								<TooltipContent side="bottom">Tablet (768px)</TooltipContent>
							</Tooltip>

							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant={currentDevice === DeviceMode.Mobile ? "default" : "ghost"}
										size="icon"
										onClick={() => handleDeviceChange(DeviceMode.Mobile)}
										className={cn(
											"h-8 w-8 transition-colors",
											currentDevice === DeviceMode.Mobile
												? "bg-primary text-primary-foreground"
												: "text-muted-foreground hover:text-foreground",
										)}
									>
										<SmartphoneIcon className="h-4 w-4" />
										<span className="sr-only">Visualização Celular</span>
									</Button>
								</TooltipTrigger>
								<TooltipContent side="bottom">Celular (375px)</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>

					{/* Canvas Viewport Container adapting to DeviceMode */}
					<div className="flex flex-1 overflow-auto p-4 justify-center items-stretch bg-muted/20">
						<div
							className={cn(
								"bg-background transition-all duration-300 w-full min-h-[550px] flex flex-col",
								currentDevice === DeviceMode.Desktop && "w-full rounded-xl border shadow-sm",
								currentDevice === DeviceMode.Tablet &&
									"w-[768px] max-w-full rounded-2xl border-2 border-border shadow-lg my-2",
								currentDevice === DeviceMode.Mobile &&
									"w-[375px] max-w-full rounded-[2.5rem] border-4 border-muted-foreground/30 shadow-2xl my-2 overflow-hidden ring-4 ring-muted/50",
							)}
						>
							{currentDevice === DeviceMode.Mobile && (
								<div className="w-full flex justify-center pt-2 pb-1 bg-muted/40 border-b border-border/40 shrink-0">
									<div className="w-16 h-1 rounded-full bg-muted-foreground/40" />
								</div>
							)}
							<Canvas />
						</div>
					</div>
				</div>

				<SidebarComponents />
			</div>
		</div>
	);
};

export default Main;
