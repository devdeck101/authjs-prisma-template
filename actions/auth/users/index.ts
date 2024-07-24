import { prisma } from "@/lib/db";
export const getUsers = async () => {
	const users = await prisma.user.findMany();
	return users;
};
