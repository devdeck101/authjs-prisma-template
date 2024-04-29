"use server";

import { signIn } from "@/auth";
import { prisma } from "@/lib/db";
import { LoginSchema, RegisterSchema } from "@/schemas/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcrypt";

export const login = async (credentials: z.infer<typeof LoginSchema>) => {
  const valid = await LoginSchema.safeParse(credentials);
  if (valid.success) {
    try {
      const resp = await signIn("credentials", {
        credentials,
        redirectTo: "/protected-route",
      });
    } catch (error) {
      if (error instanceof AuthError) {
        // Handle auth errors
        console.log(`AuthError: ${error}`);
      }
      throw error; // Rethrow all other errors
    }
  }
};

export const register = async (user: z.infer<typeof RegisterSchema>) => {
  const valid = await RegisterSchema.safeParse(user);
  if (valid.success) {
    try {
      const { name, email, password } = user;
      const hashedPassword = await bcrypt.hash(password, 10);
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
