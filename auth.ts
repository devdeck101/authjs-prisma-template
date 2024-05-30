import { PrismaAdapter } from "@auth/prisma-adapter"
import { UserRole } from "@prisma/client"
import NextAuth, { type DefaultSession } from "next-auth"
import { revalidatePath } from "next/cache"
import authConfig from "./auth.config"
import { prisma } from "./lib/db"
import { findUserbyEmail } from "./services"

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/auth/login",
	},
	callbacks: {
		async signIn({ user, email }) {
			if (user.email) {
				const registeredUser = await findUserbyEmail(user?.email)
				if (!registeredUser?.emailVerified) return false
			}
			return true
		},
		jwt({ token, user }) {
			if (user) {
				// User is available during sign-in
				//TODO: Verificar a extensão
				token.id = user.id
				token.role = UserRole.DEFAULT
			}
			return token
		},
		session({ session, token }) {
			// `session.user.role` is now a valid property, and will be type-checked
			// in places like `useSession().data.user` or `auth().user`
			return {
				...session,
				user: {
					...session.user,
					role: token.role,
				},
			}
		},
	},
	...authConfig,
})

declare module "next-auth" {
	/**
	 * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			role: UserRole
			isTwoFactorEnabled: boolean
			/**
			 * By default, TypeScript merges new interface properties and overwrites existing ones.
			 * In this case, the default session user properties will be overwritten,
			 * with the new ones defined above. To keep the default session user properties,
			 * you need to add them back into the newly declared interface.
			 */
		} & DefaultSession["user"]
	}
}
