"use client";

import Link from "next/link";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import AuthCard from "./auth-card";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CredentialsSchema } from "@/schemas/auth";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { login } from "@/actions/auth";
import { LoaderIcon } from "lucide-react";
import AuthFormMessage from "./auth-form-message";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>("");
  const form = useForm<z.infer<typeof CredentialsSchema>>({
    resolver: zodResolver(CredentialsSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CredentialsSchema>) => {
    startTransition(async () => {
      try {
        const resp = await login(values);
        if (resp.error) {
          setError(resp.error);
        }
      } catch (err) {
        setError("Algo deu errado");
      }
    });
  };

  return (
    <AuthCard title="Conecte-se" description="Seja bem-vindo novamente">
      <div className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="voce@provedor.com.br"
                        required
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormDescription className="hidden">
                      Seu e-mail.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="******"
                        required
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormDescription className="hidden">
                      Seu e-mail.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <AuthFormMessage type="error" message={error} title="Erro" />
              )}
              <Button
                variant={"default"}
                className="w-full"
                disabled={isPending}
              >
                <LoaderIcon
                  className={!isPending ? "hidden" : "animate-spin mr-2"}
                />
                <span>Conectar</span>
              </Button>
            </div>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          Não tem uma conta?{" "}
          <Link href="/auth/register" className="underline">
            Cadastre-se
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}
