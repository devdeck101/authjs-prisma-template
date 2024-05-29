"use client"

import Link from "next/link"
import { useState, useTransition } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AuthCard from "./auth-card"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import { login } from "@/actions/auth"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { CredentialsSchema } from "@/schemas/auth"
import { LoaderIcon } from "lucide-react"
import AuthFormMessage from "./auth-form-message"

export default function LoginForm() {
	const [isPending, startTransition] = useTransition()
	const [error, setError] = useState<string>("")
	const [success, setSuccess] = useState<string>("")
	const [showOTPForm, setShowOTP] = useState<boolean>(false)
	const form = useForm<z.infer<typeof CredentialsSchema>>({
		resolver: zodResolver(CredentialsSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})

	const onSubmit = async (values: z.infer<typeof CredentialsSchema>) => {
		startTransition(async () => {
			try {
				const resp = await login(values)
				if (resp.data?.twoFactorAuthEnabled) {
					setShowOTP(true)
					if (resp.error) {
						setError(resp.error)
						return
					}
					return
				}
				if (resp.error) {
					setError(resp.error)
					form.reset()
					return
				}
				if (resp.success) {
					setSuccess(resp.success)
					return
				}
			} catch (err) {
				setError("Algo deu errado")
				form.reset()
			}
		})
	}

	return (
		<AuthCard title="Conecte-se" description="Seja bem-vindo novamente">
			<div className="space-y-4">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						{!showOTPForm && (
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
												<div>
													<div className="flex items-center">
														<Link href="/auth/reset-password" className="ml-auto inline-block text-sm underline">
															Esqueceu a senha?
														</Link>
													</div>
													<Input type="password" placeholder="******" required {...field} disabled={isPending} />
												</div>
											</FormControl>
											<FormDescription className="hidden">Seu e-mail.</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								{error && <AuthFormMessage type="error" message={error} title="Erro" />}
								{success && <AuthFormMessage type="success" message={success} title="Sucesso" />}
								<Button variant={"default"} className="w-full" disabled={isPending}>
									<LoaderIcon className={!isPending ? "hidden" : "animate-spin mr-2"} />
									<span>Conectar</span>
								</Button>
							</div>
						)}
						{showOTPForm && (
							<div className="space-y-4">
								<FormField
									control={form.control}
									name="code"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Código</FormLabel>
											<FormControl>
												<InputOTP maxLength={6} {...field}>
													<InputOTPGroup>
														<InputOTPSlot index={0} />
														<InputOTPSlot index={1} />
														<InputOTPSlot index={2} />
													</InputOTPGroup>
													<InputOTPGroup>
														<InputOTPSlot index={3} />
														<InputOTPSlot index={4} />
														<InputOTPSlot index={5} />
													</InputOTPGroup>
												</InputOTP>
											</FormControl>
											<FormDescription>Favor entrar com o códio enviado por e-mail</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								{error && <AuthFormMessage type="error" message={error} title="Erro" />}
								<Button variant={"default"} className="w-full" disabled={isPending}>
									<LoaderIcon className={!isPending ? "hidden" : "animate-spin mr-2"} />
									<span>Validar</span>
								</Button>
							</div>
						)}
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
	)
}
