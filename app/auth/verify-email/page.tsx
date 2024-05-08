import EmailVerificationForm from "@/components/auth/email-verification-form"
import { Suspense } from "react"



const VerifyEmail = () => {
    return (
        <Suspense>
            <EmailVerificationForm />
        </Suspense>
    )
}

export default VerifyEmail