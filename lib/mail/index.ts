import { Resend } from "resend";
const mail = new Resend(process.env.AUTH_RESEND_KEY);
export default mail;
