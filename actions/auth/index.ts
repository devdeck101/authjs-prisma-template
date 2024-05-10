"use server";

import { signIn } from "@/auth";
import { prisma } from "@/lib/db";
import { CredentialsSchema, RegisterSchema } from "@/schemas/auth";
import { AuthError, CredentialsSignin } from "next-auth";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import { User, UserRole } from "@prisma/client";
import { createVerificationToken, findVerificationTokenbyToken } from "@/services/auth";
import { Resend } from "resend";
import { VerificationEmailTemplate } from "@/components/auth/verification-email-template";



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
        const verificationToken = await createVerificationToken(user.email)
        await sendAccountVerificationEmail(user, verificationToken.token)
        return {
          success: "Verificação de E-mail enviada com sucesso"
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

      //Verification process
      const verificationToken = await createVerificationToken(email)
      const data = await sendAccountVerificationEmail(createdUser, verificationToken.token)
    } catch (error) {
      throw error;
    }
  }
};

export const sendAccountVerificationEmail = async (user: User, token: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY)

  const { RESEND_EMAIL_FROM, VERIFICATION_SUBJECT, NEXT_PUBLIC_URL, VERIFICATION_URL } = process.env
  const verificationUrl = NEXT_PUBLIC_URL + VERIFICATION_URL + "?token=" + token
  const { email } = user
  const { data, error } = await resend.emails.send({
    from: RESEND_EMAIL_FROM,
    to: email,
    subject: VERIFICATION_SUBJECT,
    html: `<p>Clique <a href="${verificationUrl}">aqui</a> para confirmar seu e-mail.</p>`,
  })

  if (error) return {
    error
  }
  return {
    success: "E-mail enviado com sucesso"
  }

}

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
