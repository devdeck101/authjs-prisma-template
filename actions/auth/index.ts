"use server"

import { signIn } from "@/auth"
import { VerificationEmailTemplate } from "@/components/auth/verification-email-template"
import { prisma } from "@/lib/db"
import { CredentialsSchema, NewPasswordSchema, RegisterSchema, ResetPasswordSchema } from "@/schemas/auth"
import {
	createResetPasswordToken,
	createTwoFactorAuthToken,
	createVerificationToken,
	deleteResetPasswordToken,
	deleteTwoFactorAuthTokenById,
	findResetPasswordTokenByToken,
	findTwoFactorAuthTokeByToken,
	findTwoFactorAuthTokenByEmail,
	findUserbyEmail,
	findVerificationTokenbyToken,
	updatePassword,
} from "@/services/auth"
import { type User, UserRole } from "@prisma/client"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import bcryptjs from "bcryptjs"
import { AuthError, CredentialsSignin } from "next-auth"
import { Resend } from "resend"
import type { z } from "zod"

/**
 * This method is responsible to execute the login flow
 * @param credentials
 * @returns it returns an object
 * { error: string, success: string, data: { twoFactorAuthEnabled: boolean }} or
 * throw an error
 */
export const login = async (credentials: z.infer<typeof CredentialsSchema>) => {
	const validCredentials = await CredentialsSchema.safeParse(credentials)
	if (validCredentials.success) {
		try {
			const { email, password, code } = validCredentials.data
			const user = await findUserByEmail(email)
			if (!user) {
				return {
					error: "Usuário não encontrado",
				}
			}
			//Verificação de E-mail
			if (!user.emailVerified) {
				const verificationToken = await createVerificationToken(user.email)
				await sendAccountVerificationEmail(user, verificationToken.token)
				return {
					success: "Verificação de E-mail enviada com sucesso",
				}
			}

			//Two Factor Authentication
			if (user.isTwoFactorAuthEnabled) {
				if (code) {
					const twoFactorAuthToken = await findTwoFactorAuthTokenByEmail(email)

					if (!twoFactorAuthToken) {
						return {
							error: "Código Inválido",
							data: {
								twoFactorAuthEnabled: true,
							},
						}
					}

					if (twoFactorAuthToken.token !== code) {
						return {
							error: "Código Inválido",
							data: {
								twoFactorAuthEnabled: true,
							},
						}
					}

					const hasExpired = new Date(twoFactorAuthToken.expires) < new Date()

					if (hasExpired) {
						return {
							error: "Código Expirado",
							data: {
								twoFactorAuthEnabled: true,
							},
						}
					}

					await deleteTwoFactorAuthTokenById(twoFactorAuthToken.id)
				} else {
					//generate code
					const twoFactorAuthToken = await createTwoFactorAuthToken(email)
					await sendTwoFactorAuthEmail(user, twoFactorAuthToken.token)
					return {
						data: {
							twoFactorAuthEnabled: true,
						},
					}
				}
			}

			const resp = await signIn("credentials", {
				email,
				password,
				redirectTo: process.env.AUTH_LOGIN_REDIRECT,
			})
		} catch (err) {
			if (err instanceof AuthError) {
				if (err instanceof CredentialsSignin) {
					return {
						error: "Credenciais inválidas",
					}
				}
			}

			throw err // Rethrow all other errors
		}
	}
	return {
		error: "Dados inválidos",
	}
}

/**
 * This method creates the user for Credentials provider
 * @param {User} user
 * @returns it returns an object
 * { error: string, success: string } or
 * throw an error
 */
export const register = async (user: z.infer<typeof RegisterSchema>) => {
	const valid = await RegisterSchema.safeParse(user)
	if (valid.success) {
		try {
			const { name, email, password } = user
			const hashedPassword = await bcryptjs.hash(password, 10)
			const createdUser = await prisma.user.create({
				data: {
					name,
					email,
					password: hashedPassword,
					role: UserRole.DEFAULT,
				},
			})
			//Account verification flow with e-mail
			const verificationToken = await createVerificationToken(email)
			await sendAccountVerificationEmail(createdUser, verificationToken.token)
			return {
				success: "E-mail de verificação enviado",
			}
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === "P2002") {
					return {
						error: "Já existe uma conta relacionada a este e-mail.",
					}
				}
			}
			throw error
		}
	}
	return {
		error: "Dados inválidos",
	}
}

/**
 * This method initiates the reset password process
 * @param values
 * @returns
 */
export const resetPassword = async (values: z.infer<typeof ResetPasswordSchema>) => {
	const validatedEmail = ResetPasswordSchema.safeParse(values)
	if (!validatedEmail.success) {
		return { error: "E-mail inválido" }
	}

	const { email } = validatedEmail.data

	const existingUser = await findUserByEmail(email)
	if (!existingUser) {
		return { error: "Usuário não encontrado" }
	}

	const resetPasswordToken = await createResetPasswordToken(email)
	await sendResetPasswordEmail(resetPasswordToken.email, resetPasswordToken.token)

	return { success: "E-mail de mudança de senha enviado" }
}

/**
 * This method uses Resend to send an e-mail to change the user's password
 * @param { User } user
 * @param { string } token
 * @returns it returns an object
 * { error: string, success: string } or
 * throw an error
 */
export const sendResetPasswordEmail = async (email: string, token: string) => {
	const resend = new Resend(process.env.RESEND_API_KEY)

	const { NEXT_PUBLIC_URL, RESEND_EMAIL_FROM, RESET_PASSWORD_SUBJECT, RESET_PASSWORD_URL } = process.env
	const resetUrl = `${NEXT_PUBLIC_URL}${RESET_PASSWORD_URL}?token=${token}`
	const { data, error } = await resend.emails.send({
		from: RESEND_EMAIL_FROM,
		to: email,
		subject: RESET_PASSWORD_SUBJECT,
		html: `<p>Clique <a href="${resetUrl}">aqui</a> para modificar sua senha.</p>`,
	})

	if (error)
		return {
			error,
		}
	return {
		success: "E-mail enviado com sucesso",
	}
}

/**
 * This method uses Resend to send an e-mail to the user to verify
 * the ownership of the e-mail by the user
 * @param { User } user
 * @param { string } token
 * @returns it returns an object
 * { error: string, success: string } or
 * throw an error
 */
export const sendAccountVerificationEmail = async (user: User, token: string) => {
	const resend = new Resend(process.env.RESEND_API_KEY)

	const { RESEND_EMAIL_FROM, VERIFICATION_SUBJECT, NEXT_PUBLIC_URL, VERIFICATION_URL } = process.env
	const verificationUrl = `${NEXT_PUBLIC_URL}${VERIFICATION_URL}?token=${token}`
	const { email } = user
	const { data, error } = await resend.emails.send({
		from: RESEND_EMAIL_FROM,
		to: email,
		subject: VERIFICATION_SUBJECT,
		html: `<p>Clique <a href="${verificationUrl}">aqui</a> para confirmar seu e-mail.</p>`,
	})

	if (error)
		return {
			error,
		}
	return {
		success: "E-mail enviado com sucesso",
	}
}

/**
 * Find User by E-mail
 * @param {string} email - User's email
 * @returns
 */
export const findUserByEmail = async (email: string) => {
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	})
	return user
}

/**
 * This method update the user's record with the Date the e-mail was verified
 * @param {string} token
 * @returns
 */
export const verifyToken = async (token: string) => {
	const existingToken = await findVerificationTokenbyToken(token)
	if (!existingToken) {
		return {
			error: "Código de verificação não encontrado",
		}
	}

	const isTokenExpired = new Date(existingToken.expires) < new Date()
	if (isTokenExpired) {
		return {
			error: "Código de verificação expirado",
		}
	}

	const user = await findUserByEmail(existingToken.email)
	if (!user) {
		return {
			error: "Usuário não encontrado",
		}
	}

	await prisma.user.update({
		where: { id: user.id },
		data: {
			emailVerified: new Date(),
		},
	})

	await prisma.verificationToken.delete({
		where: {
			id: existingToken.id,
		},
	})

	return {
		success: "E-mail verificado",
	}
}

/**
 * This method sends an e-mail to the user with the 6 digits code to login
 * when Two Factor Authentication is enabled
 * @param {User} user
 * @param {string} token
 * @returns
 */
export const sendTwoFactorAuthEmail = async (user: User, token: string) => {
	const resend = new Resend(process.env.RESEND_API_KEY)

	const { RESEND_EMAIL_FROM, OTP_SUBJECT } = process.env
	const { email } = user
	const { data, error } = await resend.emails.send({
		from: RESEND_EMAIL_FROM,
		to: email,
		subject: OTP_SUBJECT,
		html: `<p>Sue código OTP: ${token}</p>`,
	})

	if (error)
		return {
			error,
		}
	return {
		success: "E-mail enviado com sucesso",
	}
}

/**
 * This method updates the user's record with the date and time the
 * Two Factor Authentication was verified
 * @param token
 * @returns
 */
export const verifyTwoFactorToken = async (token: string) => {
	const existingToken = await findTwoFactorAuthTokeByToken(token)
	if (!existingToken) {
		return {
			error: "Código de verificação não encontrado",
		}
	}

	const isTokenExpired = new Date(existingToken.expires) < new Date()
	if (isTokenExpired) {
		return {
			error: "Código de verificação expirado",
		}
	}

	const user = await findUserByEmail(existingToken.email)
	if (!user) {
		return {
			error: "Usuário não encontrado",
		}
	}

	await prisma.user.update({
		where: { id: user.id },
		data: {
			twoFactorAuthVerified: new Date(),
		},
	})

	await prisma.twoFactorToken.delete({
		where: {
			id: existingToken.id,
		},
	})

	return {
		success: "Autênticação de dois fatores verificada",
	}
}

/**
 * This method updates the user's password
 * @param { string } passwordData - Changed hashed password
 * @param { string } token
 * @returns
 */
export const changePassword = async (passwordData: z.infer<typeof NewPasswordSchema>, token: string | null) => {
	if (!token) {
		return { error: "Token não encontrado" }
	}

	const validatedPassword = NewPasswordSchema.safeParse(passwordData)

	if (!validatedPassword.success) {
		return { error: "Valores inválidos" }
	}

	const { password } = validatedPassword.data

	const existingToken = await findResetPasswordTokenByToken(token)
	if (!existingToken) {
		return { error: "Token inválido" }
	}

	const hasExpired = new Date(existingToken.expires) < new Date()
	if (hasExpired) {
		return { error: "Token Expirado" }
	}

	const existingUser = await findUserbyEmail(existingToken.email)
	if (!existingUser) {
		return { error: "Usuário não encontrado" }
	}

	const hashedPassword = await bcryptjs.hash(password, 10)

	await updatePassword(existingUser.id, hashedPassword)

	await deleteResetPasswordToken(existingToken.id)

	return { success: "Senha atualizada" }
}
