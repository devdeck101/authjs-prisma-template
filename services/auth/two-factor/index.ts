import { prisma } from "@/lib/db";
import { generateOTP } from "@/lib/utils";

export const findTwoFactorAuthTokenByEmail = async (email: string) => {
	const token = await prisma.twoFactorToken.findUnique({
		where: {
			email,
		},
	});
	return token;
};
export const isTwoFactorAutenticationEnabled = async (id: string) => {
	const user = await prisma.user.findUnique({
		where: {
			id,
		},
		select: {
			isTwoFactorAuthEnabled: true,
		},
	});
	return user?.isTwoFactorAuthEnabled;
};

export const deleteTwoFactorAuthTokenById = async (id: string) => {
	const token = await prisma.twoFactorToken.delete({
		where: {
			id,
		},
	});
	return token;
};

export const findTwoFactorAuthTokeByToken = async (token: string) => {
	const existingToken = await prisma.twoFactorToken.findUnique({
		where: {
			token,
		},
	});
	return existingToken;
};

export const createTwoFactorAuthToken = async (email: string) => {
	const token = generateOTP(6);
	const expires = new Date(new Date().getTime() + 2 * 60 * 60 * 1000); //two hours

	const existingToken = await findTwoFactorAuthTokenByEmail(email);
	if (existingToken) {
		await deleteTwoFactorAuthTokenById(existingToken.id);
	}

	const twoFactorAuthToken = await prisma.twoFactorToken.create({
		data: {
			email,
			token,
			expires,
		},
	});

	return twoFactorAuthToken;
};
