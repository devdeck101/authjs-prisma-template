import { ChangePasswordForm } from "@/components/auth/change-password-form"
import React, { Suspense } from "react"

const ChangePassword = () => {
	return (
		<div className="flex flex-col w-full min-h-full items-center justify-center">
			<Suspense>
				<ChangePasswordForm />
			</Suspense>
		</div>
	)
}

export default ChangePassword
