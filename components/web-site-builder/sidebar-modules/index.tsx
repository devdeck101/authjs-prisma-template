"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useWebsiteBuilder } from "@/hooks/web-site-builder";
import { cn } from "@/lib/utils";
import { DeviceMode } from "@/types/web-site-builder";
import { ActionType, type ChangeDeviceMode } from "@/types/web-site-builder/actions";
import { ComputerIcon, LayoutGridIcon, SmartphoneIcon, TabletIcon, UserIcon } from "lucide-react";
import Link from "next/link";

const SidebarModules = () => {
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
		<div className="hidden md:block fixed right-0 z-10 h-full w-14 border-r border-t border-b bg-background sm:static sm:w-auto">
			<div className="flex h-full flex-col items-center gap-4 px-2 py-5">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="#"
								className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
								prefetch={false}
							>
								<LayoutGridIcon className="h-5 w-5" />
								<span className="sr-only">Componentes</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="left">Componentes</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				{/* Device Mode Selector Buttons */}
				<div className="flex-1 overflow-auto">
					<div className="grid gap-2 px-1">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										type="button"
										onClick={() => handleDeviceChange(DeviceMode.Desktop)}
										className={cn(
											"flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 focus:outline-none",
											currentDevice === DeviceMode.Desktop
												? "bg-primary text-primary-foreground shadow-sm"
												: "text-muted-foreground hover:text-foreground hover:bg-muted",
										)}
									>
										<ComputerIcon className="h-4 w-4" />
										<span className="sr-only">Desktop</span>
									</button>
								</TooltipTrigger>
								<TooltipContent side="left">Visualização Desktop</TooltipContent>
							</Tooltip>

							<Tooltip>
								<TooltipTrigger asChild>
									<button
										type="button"
										onClick={() => handleDeviceChange(DeviceMode.Tablet)}
										className={cn(
											"flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 focus:outline-none",
											currentDevice === DeviceMode.Tablet
												? "bg-primary text-primary-foreground shadow-sm"
												: "text-muted-foreground hover:text-foreground hover:bg-muted",
										)}
									>
										<TabletIcon className="h-4 w-4" />
										<span className="sr-only">Tablet</span>
									</button>
								</TooltipTrigger>
								<TooltipContent side="left">Visualização Tablet</TooltipContent>
							</Tooltip>

							<Tooltip>
								<TooltipTrigger asChild>
									<button
										type="button"
										onClick={() => handleDeviceChange(DeviceMode.Mobile)}
										className={cn(
											"flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 focus:outline-none",
											currentDevice === DeviceMode.Mobile
												? "bg-primary text-primary-foreground shadow-sm"
												: "text-muted-foreground hover:text-foreground hover:bg-muted",
										)}
									>
										<SmartphoneIcon className="h-4 w-4" />
										<span className="sr-only">Celular</span>
									</button>
								</TooltipTrigger>
								<TooltipContent side="left">Visualização Celular</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</div>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="#"
								className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
								prefetch={false}
							>
								<UserIcon className="h-5 w-5" />
								<span className="sr-only">Perfil</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="left">Perfil</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</div>
	);
};

export default SidebarModules;
