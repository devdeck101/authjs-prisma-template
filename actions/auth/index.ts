"use server";

import { LoginSchema } from "@/schemas/auth";
import { z } from "zod";

export const login = async (credentials: z.infer<typeof LoginSchema>) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });
  console.log("login action");
  console.log(credentials);
};
