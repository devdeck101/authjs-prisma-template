import { prisma } from "@/lib/db";
import { v4 as uuid } from "uuid"

export const findUserbyEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const findVerificationTokenbyEmail = async (email: string) => {
  const token = await prisma.verificationToken.findUnique({
    where: {
      email,
    },
  });
  return token;
};

export const findVerificationTokenbyToken = async (token: string) => {
  const existingToken = await prisma.verificationToken.findUnique({
    where: {
      token,
    },
  });
  return existingToken;
};

export const deleteVerificationTokenbyId = async (id: string) => {
  const token = await prisma.verificationToken.delete({
    where: {
      id,
    },
  });
  return token;
};


export const createVerificationToken = async (email: string) => {
  const token = uuid()
  const expires = new Date(new Date().getTime() + (2 * 60 * 60 * 1000)) //two hours

  const existingToken = await findVerificationTokenbyEmail(email)
  if (existingToken) {
    await deleteVerificationTokenbyId(existingToken.id)
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires
    }
  })

  return verificationToken
}