import { prisma } from "@/lib/db";

export const findUserbyEmail = async (email: string) => {
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});
	return user;
};

export const findUserbyId = async (id: string) => {
	const user = await prisma.user.findUnique({
		where: {
			id,
		},
		select: {
			id: true,
			name: true,
			email: true,
			password: true,
			isTwoFactorAuthEnabled: true,
		},
	});
	return user;
};
