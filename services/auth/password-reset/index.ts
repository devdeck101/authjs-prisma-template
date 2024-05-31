import { prisma } from "@/lib/db";
import { v4 as uuid } from "uuid";

export const findResetPasswordTokenByToken = async (token: string) => {
	const resetPasswordToken = await prisma.resetPasswordToken.findUnique({
		where: { token },
	});

	return resetPasswordToken;
};

export const findResetPasswordTokenByEmail = async (email: string) => {
	const passwordResetToken = await prisma.resetPasswordToken.findFirst({
		where: { email },
	});

	return passwordResetToken;
};

export const deleteResetPasswordToken = async (id: string) => {
	await prisma.resetPasswordToken.delete({
		where: { id },
	});
};

export const updatePassword = async (id: string, password: string) => {
	await prisma.user.update({
		where: { id },
		data: { password },
	});
};

export const createResetPasswordToken = async (email: string) => {
	const token = uuid();
	const expires = new Date(new Date().getTime() + 2 * 60 * 60 * 1000); //two hours

	const existingToken = await findResetPasswordTokenByEmail(email);
	if (existingToken) {
		await deleteResetPasswordToken(existingToken.id);
	}

	const verificationToken = await prisma.resetPasswordToken.create({
		data: {
			email,
			token,
			expires,
		},
	});

	return verificationToken;
};
