import { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { CredentialsSchema } from "./schemas/auth";
import { findUserbyEmail } from "./services/auth";
import { UserNotFound, InvalidCredentials } from "./lib/auth";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validdCredentials = CredentialsSchema.safeParse(credentials);
        if (validdCredentials.success) {
          const { email, password } = validdCredentials.data;
          const user = await findUserbyEmail(email);
          if (!user || !user.password) {
            throw new UserNotFound();
          }
          const validPassword = await bcryptjs.compare(password, user.password);
          if (validPassword) return user;
        }
        //TODO: Would it be better to throw new InvalidCredential?
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
