"use server";

import { signIn } from "@/auth";
import { prisma } from "@/lib/db";
import { CredentialsSchema, RegisterSchema } from "@/schemas/auth";
import { AuthError, CredentialsSignin } from "next-auth";
import { z } from "zod";
import bcryptjs from "bcryptjs";

export const login = async (credentials: z.infer<typeof CredentialsSchema>) => {
  const validCredentials = await CredentialsSchema.safeParse(credentials);
  if (validCredentials.success) {
    try {
      const { email, password } = validCredentials.data;
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
