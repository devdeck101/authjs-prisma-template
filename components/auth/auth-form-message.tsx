import { AlertCircle, CheckCircle } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface AuthFormMessageProps {
	title?: string
	message: string
	type: "success" | "error"
}
const AuthFormMessage = ({ message, type, title }: AuthFormMessageProps) => {
	return (
		<Alert variant={type}>
			{type === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
			{title && <AlertTitle>{title}</AlertTitle>}
			<AlertDescription>{message}</AlertDescription>
		</Alert>
	)
}

export default AuthFormMessage
