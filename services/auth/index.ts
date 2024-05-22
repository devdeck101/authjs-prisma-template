import { prisma } from "@/lib/db";
import { generateOTP } from "@/lib/utils";
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

export const findTwoFactorAuthTokenByEmail = async (email: string) => {
  const token = await prisma.twoFactorToken.findUnique({
    where: {
      email,
    },
  });
  return token;
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
  const token = generateOTP(6)
  const expires = new Date(new Date().getTime() + (2 * 60 * 60 * 1000)) //two hours

  const existingToken = await findTwoFactorAuthTokenByEmail(email)
  if (existingToken) {
    await deleteTwoFactorAuthTokenById(existingToken.id)
  }

  const twoFactorAuthToken = await prisma.twoFactorToken.create({
    data: {
      email,
      token,
      expires
    }
  })

  return twoFactorAuthToken;

}