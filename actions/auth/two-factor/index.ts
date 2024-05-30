"use server"

import { prisma } from "@/lib/db"
import { findTwoFactorAuthTokeByToken } from "@/services/auth"
import { findUserbyEmail } from "@/services"
import type { User } from "@prisma/client"
import { Resend } from "resend"

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

	const user = await findUserbyEmail(existingToken.email)
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
