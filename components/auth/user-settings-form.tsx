"use client";

import { register } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserSettingsSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import AuthFormMessage from "./auth-form-message";

export default function UserSettingsForm() {
	const user = useCurrentUser();
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string>("");
	const [success, setSuccess] = useState<string>("");
	const form = useForm<z.infer<typeof UserSettingsSchema>>({
		resolver: zodResolver(UserSettingsSchema),
		defaultValues: {
			name: user?.name || undefined,
			email: user?.email || undefined,
			password: undefined,
			isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
		},
	});

	const onSubmit = async (values: z.infer<typeof UserSettingsSchema>) => {
		startTransition(async () => {
			try {
				const { success, error } = await register(values);
				if (error) setError(error);
				setSuccess(success || "");
				form.reset();
			} catch (error) {
				setSuccess("");
				setError("Algo deu errado.");
				form.reset();
			}
		});
	};

	return (
		<Card x-chunk="dashboard-04-chunk-1">
			<CardHeader>
				<CardTitle>Dados do Usuário</CardTitle>
				<CardDescription>Suas informações</CardDescription>
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
													autoComplete="off"
													type="name"
													placeholder="Jose da Silva"
													required
													{...field}
													disabled={isPending}
												/>
											</FormControl>
											<FormDescription className="hidden">Seu nome.</FormDescription>
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
											<FormDescription className="hidden">Seu e-mail.</FormDescription>
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
												<Input type="password" placeholder="******" required {...field} disabled={isPending} />
											</FormControl>
											<FormDescription className="hidden">Seu e-mail.</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="isTwoFactorEnabled"
									render={({ field }) => (
										<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 m-2 space-x-2">
											<ShieldAlert className="text-yellow-400" />
											<FormLabel className="flex-1 space-y-1">
												<p className="text-sm font-medium leading-none">Autenticação de 2 Fatores</p>
												<p className="text-sm text-muted-foreground">Deixe sua conta mais segura</p>
											</FormLabel>
											<FormControl>
												<Switch checked={field.value} onCheckedChange={field.onChange} />
											</FormControl>
										</FormItem>
									)}
								/>

								{error && <AuthFormMessage type="error" message={error} title="Erro" />}
								{success && <AuthFormMessage type="success" message={success} title="Sucesso" />}
								<Separator />
								<div className="w-full flex justify-end items-center">
									<Button variant={"default"} disabled={isPending}>
										<LoaderIcon className={!isPending ? "hidden" : "animate-spin mr-2"} />
										<span>Salvar</span>
									</Button>
								</div>
							</div>
						</form>
					</Form>

					<div className="mt-4 text-center text-sm">
						<Link href="/" className="underline">
							Página Inicial
						</Link>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
