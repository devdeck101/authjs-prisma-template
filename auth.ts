import { PrismaAdapter } from "@auth/prisma-adapter"
import { UserRole } from "@prisma/client"
import NextAuth, { type DefaultSession } from "next-auth"
import authConfig from "./auth.config"
import { prisma } from "./lib/db"
import { findUserbyEmail } from "./services"
import { isTwoFactorAutenticationEnabled } from "./services/auth"

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
		async jwt({ token, user }) {
			if (user) {
				// User is available during sign-in
				if (user.id) {
					const isTwoFactorEnabled = await isTwoFactorAutenticationEnabled(user?.id || "")
					token.isTwoFactorEnabled = isTwoFactorEnabled
				}
				token.id = user.id
				token.role = UserRole.DEFAULT
			}
			return token
		},
		session({ session, token }) {
			// `session.user.role` is now a valid property, and will be type-checked
			// in places like `useSession().data.user` or `auth().user`
			if (session.user) {
				session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
			}
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

// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
	/** Returned by the `jwt` callback and `auth`, when using JWT sessions */
	interface JWT {
		/** Two Factor Authentication */
		isTwoFactorEnabled?: boolean
	}
}
