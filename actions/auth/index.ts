"use server";

import { signIn } from "@/auth";
import { prisma } from "@/lib/db";
import { CredentialsSchema, RegisterSchema } from "@/schemas/auth";
import { AuthError, CredentialsSignin } from "next-auth";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import { UserRole } from "@prisma/client";
import { createVerificationToken, findVerificationTokenbyToken } from "@/services/auth";
import { use } from "react";


export const login = async (credentials: z.infer<typeof CredentialsSchema>) => {
  const validCredentials = await CredentialsSchema.safeParse(credentials);
  if (validCredentials.success) {
    try {
      const { email, password } = validCredentials.data;
      const user = await findUserbyEmail(email)
      if (!user) {
        return {
          error: "Usuário não encontrado"
        }
      }
      if (!user.emailVerified) {
        // TODO: Gerar o Token e enviar o email de verificação

        const verificationToken = await createVerificationToken(user.email)
        console.log(`=> Verification Token Created`)
        console.log(verificationToken)

        return {
          success: "TODO: Send Email | E-mail enviado com sucesso"
        }
      }
      const resp = await signIn("credentials", {
        email,
        password,
        redirectTo: "/protected-route",
      });
    } catch (err) {
      if (err instanceof AuthError) {
        if (err instanceof CredentialsSignin) {
          return {
            error: err.code,
          };
        }
      }

      throw err; // Rethrow all other errors
    }
  }
  return {
    error: "Dados inválidos",
  };
};

export const register = async (user: z.infer<typeof RegisterSchema>) => {
  const valid = await RegisterSchema.safeParse(user);
  if (valid.success) {
    try {
      const { name, email, password } = user;
      const hashedPassword = await bcryptjs.hash(password, 10);
      const createdUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: UserRole.DEFAULT
        },
      });
      console.log(`Created User ${createdUser}`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};

export const findUserbyEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const verifyToken = async (token: string) => {

  const existingToken = await findVerificationTokenbyToken(token)
  if (!existingToken) {
    return {
      error: "Código de verificação não encontrado"
    }
  }

  const isTokenExpired = new Date(existingToken.expires) < new Date();
  if (isTokenExpired) {
    return {
      error: "Código de verificação expirado"
    }
  }

  const user = await findUserbyEmail(existingToken.email);
  if (!user) {
    return {
      error: "Usuário não encontrado"
    }
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: new Date(),
    },
  });

  await prisma.verificationToken.delete({
    where: {
      id: existingToken.id
    }
  })

  return {
    success: "E-mail verificado"
  }
}
