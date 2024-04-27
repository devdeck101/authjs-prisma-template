import NextAuth, { type User, type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";

import { prisma } from "./lib/db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "voce@provider.com.br",
        },
        password: { label: "Senha", type: "password", placeholder: "******" },
      },
      async authorize(credentials) {
        console.log(`authorize(credentials)`);
        console.log(`CREDENTIALS: ${JSON.stringify(credentials)}`);
        console.log(`---------------------`);

        const user: User = {
          id: "1",
          name: "Bruno Kilian",
          email: "bk@gmail.com",
        };

        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      console.log(`jwt({ token, user })`);
      console.log(`TOKEN: ${JSON.stringify(token)}`);
      console.log(`USER: ${JSON.stringify(user)}`);
      console.log(`---------------------`);
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      // `session.user.address` is now a valid property, and will be type-checked
      // in places like `useSession().data.user` or `auth().user`
      console.log(`session({ session, token })`);
      console.log(`SESSIOM: ${JSON.stringify(token)}`);
      console.log(`TOKEN: ${JSON.stringify(token)}`);
      console.log(`---------------------`);
      return {
        ...session,
        user: {
          ...session.user,
          role: "DEFAULT",
        },
      };
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  debug: true,
});

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      role: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}
