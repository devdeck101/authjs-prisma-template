"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ResetPasswordSchema } from "@/schemas/auth";
import { resetPassword } from "@/actions/auth";
import AuthCard from "./auth-card";
import AuthFormMessage from "./auth-form-message";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";

export const ResetPasswordForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const { success, error } = await resetPassword(values);
        if (error) setError(error);
        setSuccess(success || "");
        form.reset();
      } catch (err) {
        setSuccess("");
        setError("Algo deu errado.");
        form.reset();
      }
    });
  };

  return (
    <AuthCard title="Mudança de Senha" description="Digite o e-mail cadastrado">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="voce@provedor.com.br"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {error && (
            <AuthFormMessage type="error" message={error} title="Erro" />
          )}
          {success && (
            <AuthFormMessage type="success" message={success} title="Sucesso" />
          )}

          <Button variant={"default"} className="w-full" disabled={isPending}>
            <LoaderIcon
              className={!isPending ? "hidden" : "animate-spin mr-2"}
            />
            <span>Enviar e-mail</span>
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-center text-sm">
        Gostaria de conectar-se?{" "}
        <Link href="/auth/login" className="underline">
          Conectar agora
        </Link>
      </div>
    </AuthCard>
  );
};
