"use client";

import CampaignForm from "./campaign-form";
import { CampaignProvider } from "./multi-step-campaign-config";

const MultiStepCampaign = () => {
	return (
		<CampaignProvider>
			<CampaignForm />
		</CampaignProvider>
	);
};

export default MultiStepCampaign;
