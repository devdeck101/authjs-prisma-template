import { prisma } from "@/lib/db";
import { v4 as uuid } from "uuid";

export const findVerificationTokenByEmail = async (email: string) => {
  const token = await prisma.verificationToken.findUnique({
    where: {
      email,
    },
  });
  return token;
};

export const findVerificationTokenByToken = async (token: string) => {
  const existingToken = await prisma.verificationToken.findUnique({
    where: {
      token,
    },
  });
  return existingToken;
};

export const deleteVerificationTokenById = async (id: string) => {
  const token = await prisma.verificationToken.delete({
    where: {
      id,
    },
  });
  return token;
};

export const createVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 2 * 60 * 60 * 1000); //two hours

  const existingToken = await findVerificationTokenByEmail(email);
  if (existingToken) {
    await deleteVerificationTokenById(existingToken.id);
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};
