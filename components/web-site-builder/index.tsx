import React from "react";
import Main from "./main";
import Page from "./page";
import SidebarModules from "./sidebar-modules";

const WebsiteBuilder = () => {
	return (
		<Page>
			<Main />
			<SidebarModules />
		</Page>
	);
};

export default WebsiteBuilder;
