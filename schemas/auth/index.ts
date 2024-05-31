import { z } from "zod";

export const CredentialsSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
	code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
	name: z.string().min(5),
	email: z.string().email(),
	password: z.string().min(6),
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

export const UserSettingsSchema = z.object({
	name: z.string().min(5),
	email: z.string().email(),
	password: z.string().min(6),
	isTwoFactorEnabled: z.boolean(),
});

export const ResetPasswordSchema = z.object({
	email: z.string().email(),
});

export const NewPasswordSchema = z.object({
	password: z.string().min(6),
});
