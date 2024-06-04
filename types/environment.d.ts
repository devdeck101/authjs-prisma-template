declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DATABASE_URL: string;
			NEXTAUTH_SECRET: string;
			NEXT_PUBLIC_URL: string;
			VERIFICATION_URL: string;
			AUTH_RESEND_KEY: string;
			RESEND_EMAIL_FROM: string;
			VERIFICATION_SUBJECT: string;
			AUTH_LOGIN_REDIRECT: string;
			OTP_SUBJECT: string;
			RESET_PASSWORD_URL: string;
			RESET_PASSWORD_SUBJECT: string;
		}
	}
}
export type {};
