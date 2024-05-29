"use client"

import { signIn } from "next-auth/react"
import type { ReactNode } from "react"

type Props = {
	children?: ReactNode
}

const LoginButton = ({ children }: Props) => {
	return (
		// biome-ignore lint: reason
		<div
			onClick={async () => {
				signIn()
			}}
		>
			{children}
		</div>
	)
}

export default LoginButton
