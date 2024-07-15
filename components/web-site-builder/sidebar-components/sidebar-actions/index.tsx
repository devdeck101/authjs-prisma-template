"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CloudUpload, Eye, Save } from "lucide-react";
import Preview from "../../preview";
const SidebarActions = () => {
	return (
		<div className="flex flex-row w-full items-center justify-around border rounded-lg">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Dialog>
							<DialogTrigger asChild>
								<Button className="flex-1" variant={"ghost"} size={"icon"}>
									<Eye className="w-6 h-6" />
								</Button>
							</DialogTrigger>
							<DialogContent className="flex flex-col min-w-full min-h-screen justify-start">
								<DialogTitle />
								<DialogDescription />
								<Preview />
							</DialogContent>
						</Dialog>
					</TooltipTrigger>
					<TooltipContent>
						<p>Visualizar</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button className="flex-1" variant={"ghost"} size={"icon"}>
							<Save className="w-6 h-6 mr-2" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Salvar</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button className="flex-1" variant={"ghost"} size={"icon"}>
							<CloudUpload className="w-6 h-6 mr-2" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Publicar</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
};

export default SidebarActions;
