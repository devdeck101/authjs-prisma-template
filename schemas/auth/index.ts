import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
export const RegisterSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(1),
});
// .refine(
//   (values) => {
//     console.log(`Values ${JSON.stringify(values)}`);
//     return values.password === values.matchPassword;
//   },
//   {
//     message: "Passwords must match!",
//     path: ["confirmPassword"],
//   }
// );
