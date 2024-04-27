"use server";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas/auth";
import { AuthError } from "next-auth";
import { z } from "zod";

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
