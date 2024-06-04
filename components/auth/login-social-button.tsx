"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import type { ReactNode } from "react";

type Props = {
	provider: "google" | "github";
	callbackUrl?: string;
	children?: ReactNode;
};

const LoginSocialButton = ({ children, provider, callbackUrl }: Props) => {
	return (
		// biome-ignore lint: TODO: Need to implement key stroke shortcuts
		<Button
			variant={"outline"}
			size={"default"}
			onClick={async () => {
				signIn(provider, { redirect: true, callbackUrl });
			}}
		>
			{children}
		</Button>
	);
};

export default LoginSocialButton;
