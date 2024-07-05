"use client";

import Link from "next/link";

import Main from "@/components/web-site-builder/main";
import SidebarModules from "@/components/web-site-builder/sidebar-modules";
import Page from "@/components/web-site-builder/page";



const CampaignBuilder = () => {

    // const { state, dispatch } = useWebsiteBuilder();

    return (
        (
            <Page>
                <Main />
                <SidebarModules />
            </Page>

        )
    )
}

export default CampaignBuilder