import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AuthCardProps {
	title?: string
	description?: string
	children: React.ReactNode
}

const AuthCard = ({ title, description, children }: AuthCardProps) => {
	return (
		<Card className="mx-auto max-w-sm min-w-[350px] shadow-md">
			<CardHeader>
				{title && <CardTitle className="text-2xl">{title}</CardTitle>}
				{description && <CardDescription>{description}</CardDescription>}
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	)
}

export default AuthCard
