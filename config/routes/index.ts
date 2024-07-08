import type { ConfigRoutes } from "@/types/routes";

export const configRoutes: ConfigRoutes = {
	publicRoutes: [
		"/",
		"/auth/login",
		"/auth/register",
		"/auth/change-password",
		"/auth/reset-password",
		"/auth/verify-email",
	],
	authRoutes: ["/api/auth/signin"],
	apiRoutes: ["/api/protected-api"],
	protectedRoutes: [
		"/auth/settings",
		"/example/multi-step-form/campaign",
		"/example/web-site-builder/campaign-hot-page",
	],
};
