declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      NEXTAUTH_SECRET: string;
      NEXT_PUBLIC_URL: string;
      VERIFICATION_URL: string;
      RESEND_API_KEY: string;
      RESEND_EMAIL_FROM: string;
      VERIFICATION_SUBJECT: string;
    }
  }
}
export { };
