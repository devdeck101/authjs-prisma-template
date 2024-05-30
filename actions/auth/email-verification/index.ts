"use server"

import { prisma } from "@/lib/db"
import { findVerificationTokenbyToken } from "@/services/auth"
import { findUserbyEmail } from "@/services"
import type { User } from "@prisma/client"
import { Resend } from "resend"

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

	const user = await findUserbyEmail(existingToken.email)
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
