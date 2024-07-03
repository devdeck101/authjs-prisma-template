import { WebsiteBuilderContext } from "@/app/example/web-site-builder/compaign-hot-page/_components/web-site-builder-campaign-config";
import { useContext } from "react";

const useWebsiteBuilder = () => {
	const context = useContext(WebsiteBuilderContext);
	if (!context) {
		throw new Error("useWebsiteBuilder must be inside a WebsiteBuilderProvider");
	}

	return context;
};

export { useWebsiteBuilder };
