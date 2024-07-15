"use client";

import CampaignBuilder from "./campaign-builder";
import { WebsiteBuilderProvider } from "./web-site-builder-campaign-config";

const WebsiteBuilderCampaign = () => {
	return (
		<WebsiteBuilderProvider>
			<CampaignBuilder />
		</WebsiteBuilderProvider>
	);
};

export default WebsiteBuilderCampaign;
