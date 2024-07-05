import { LayoutGridIcon, SmartphoneIcon, TabletIcon } from "lucide-react";
import Link from "next/link";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { ComputerIcon, UserIcon } from "lucide-react";


const SidebarModules = () => {
    return (
        <div className="fixed right-0 z-10 h-full w-14 border-r border-t border-b bg-background sm:static sm:w-auto">
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
                                <span className="sr-only">Components</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Components</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <div className="flex-1 overflow-auto">
                    <div className="grid gap-2 px-2">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground md:h-8 md:w-8">
                            <SmartphoneIcon className="h-5 w-5" />
                        </div>
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                            <TabletIcon className="h-5 w-5" />
                        </div>
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                            <ComputerIcon className="h-5 w-5" />
                        </div>
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
                                <span className="sr-only">User</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">User</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}

export default SidebarModules