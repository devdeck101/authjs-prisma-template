"use client";

import { useWebsiteBuilder } from "@/hooks/web-site-builder";
import { Element } from "@/types/web-site-builder";

//TODO: Evaluate to render on the server
const Preview = () => {
	const {
		state: {
			editor: { elements },
		},
	} = useWebsiteBuilder();
	return (
		<>
			{elements.map((element) => {
				const LiveComponent = element.liveComponent;
				return <LiveComponent key={element.id} instance={element} />;
			})}
		</>
	);
};

export default Preview;
