"use server";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/db";
import { CredentialsSchema, RegisterSchema } from "@/schemas/auth";
import { AuthError, CredentialsSignin } from "next-auth";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import { User, UserRole } from "@prisma/client";
import { createTwoFactorAuthToken, createVerificationToken, deleteTwoFactorAuthTokenById, findTwoFactorAuthTokeByToken, findTwoFactorAuthTokenByEmail, findVerificationTokenbyToken } from "@/services/auth";
import { Resend } from "resend";
import { VerificationEmailTemplate } from "@/components/auth/verification-email-template";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { RedirectType, redirect } from "next/navigation";



export const login = async (credentials: z.infer<typeof CredentialsSchema>) => {
  const validCredentials = await CredentialsSchema.safeParse(credentials);
  if (validCredentials.success) {
    try {
      console.log(validCredentials.data)
      const { email, password, code } = validCredentials.data;
      const user = await findUserbyEmail(email)
      if (!user) {
        return {
          error: "Usuário não encontrado"
        }
      }
      //Verificação de E-mail
      if (!user.emailVerified) {
        const verificationToken = await createVerificationToken(user.email)
        await sendAccountVerificationEmail(user, verificationToken.token)
        return {
          success: "Verificação de E-mail enviada com sucesso"
        }
      }

      //Two Factor Authentication
      if (user.isTwoFactorAuthEnabled) {
        if (code) {
          const twoFactorAuthToken = await findTwoFactorAuthTokenByEmail(email)

          if (!twoFactorAuthToken) {
            return {
              error: "Código Inválido",
              data: {
                twoFactorAuthEnabled: true
              }
            }
          }

          if (twoFactorAuthToken.token !== code) {
            return {
              error: "Código Inválido",
              data: {
                twoFactorAuthEnabled: true
              }
            }
          }

          const hasExpired = new Date(twoFactorAuthToken.expires) < new Date()

          if (hasExpired) {
            return {
              error: "Código Expirado",
              data: {
                twoFactorAuthEnabled: true
              }
            }
          }

          await deleteTwoFactorAuthTokenById(twoFactorAuthToken.id)

        } else { //generate code
          const twoFactorAuthToken = await createTwoFactorAuthToken(email)
          await sendTwoFactorAuthEmail(user, twoFactorAuthToken.token)
          return {
            data: {
              twoFactorAuthEnabled: true
            }
          }
        }
      }

      const resp = await signIn("credentials", {
        email,
        password,
        redirectTo: process.env.AUTH_LOGIN_REDIRECT,
        // redirect: false,
      });
      //TODO: Review - It is not revalidating and the badge button requires hard reload
      // revalidatePath("/")
      // redirect(process.env.AUTH_LOGIN_REDIRECT, RedirectType.replace)


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
      //Account verification flow with e-mail
      const verificationToken = await createVerificationToken(email)
      await sendAccountVerificationEmail(createdUser, verificationToken.token)
      return {
        success: "E-mail de verificação enviado"
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == "P2002") {
          return {
            error: "Já existe uma conta relacionada a este e-mail."
          }
        }
      }
      throw error;
    }
  }
  return {
    error: "Dados inválidos"
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

export const sendTwoFactorAuthEmail = async (user: User, token: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY)

  const { RESEND_EMAIL_FROM, OTP_SUBJECT } = process.env
  const { email } = user
  const { data, error } = await resend.emails.send({
    from: RESEND_EMAIL_FROM,
    to: email,
    subject: OTP_SUBJECT,
    html: `<p>Sue código OTP: ${token}</p>`,
  })

  if (error) return {
    error
  }
  return {
    success: "E-mail enviado com sucesso"
  }

}

export const verifyTwoFactorToken = async (token: string) => {

  const existingToken = await findTwoFactorAuthTokeByToken(token)
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
      twoFactorAuthVerified: new Date(),
    },
  });

  await prisma.twoFactorToken.delete({
    where: {
      id: existingToken.id
    }
  })

  return {
    success: "Autênticação de dois fatores verificada"
  }
}
