"use client";

import { useWebsiteBuilder } from "@/hooks/web-site-builder";



const CampaignBuilder = () => {

    const { state, dispatch } = useWebsiteBuilder();

    return (
        <div>CampaignBuilder</div>
    )
}

export default CampaignBuilder