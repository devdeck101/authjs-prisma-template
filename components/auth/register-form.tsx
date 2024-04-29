"use client";

import Link from "next/link";
import { useTransition } from "react";

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

import { RegisterSchema } from "@/schemas/auth";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { register } from "@/actions/auth";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    startTransition(async () => {
      await register(values);
      router.push("/auth/login");
    });
  };

  return (
    <Card className="mx-auto max-w-sm min-w-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl">Registre-se</CardTitle>
        <CardDescription>Seja bem-vindo</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="name"
                          placeholder="Jose da Silva"
                          required
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormDescription className="hidden">
                        Seu nome.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                  <span>Registrar</span>
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            Já tem uma conta?{" "}
            <Link href="/auth/login" className="underline">
              Efetue Login
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
