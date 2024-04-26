"use client";

import Link from "next/link";
import { startTransition, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas/auth";
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

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    console.log(values);
    startTransition(async () => {
      await login(values);
    });
  };

  return (
    <Card className="mx-auto max-w-sm min-w-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl">Conecte-se</CardTitle>
        <CardDescription>Seja bem-vindo novamente</CardDescription>
      </CardHeader>
      <CardContent>
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
            <Link href="#" className="underline">
              Cadastre-se
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
