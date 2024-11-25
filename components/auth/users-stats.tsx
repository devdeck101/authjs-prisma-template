"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { User } from "@/types/shared";

type Props = {
	users: User[];
};

const UsersStats = ({ users }: Props) => {
	const totalUsers = users.length;
	const verifiedUsers = users.filter((usr) => usr.emailVerified !== undefined).length;
	const total2FAEnabled = users.filter((usr) => usr.isTwoFactorAuthEnabled !== undefined).length;

	return (
		<div className="flex flex-row items-center justify-around w-full">
			<Card>
				<CardHeader>
					<CardTitle>{"Usuários Totais"}</CardTitle>
					<CardDescription />
				</CardHeader>
				<CardContent className="flex items-center justify-center text-4xl">{totalUsers}</CardContent>
				<CardFooter className="flex flex-row items-center justify-evenly">
					<div className="flex flex-col items-center justify-center">
						<div className="text-sm text-muted-foreground">{"Verified"}</div>
						<div className="text-xl text-muted-foreground">{verifiedUsers}</div>
					</div>
					<Separator orientation="vertical" className="mx-2 h-10 w-px" />
					<div className="flex flex-col items-center justify-center">
						<div className="text-sm text-muted-foreground">{"Verified"}</div>
						<div className="text-xl text-muted-foreground">{total2FAEnabled}</div>
					</div>
				</CardFooter>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>{"Usuários Totais"}</CardTitle>
					<CardDescription />
				</CardHeader>
				<CardContent className="flex items-center justify-center text-4xl">{totalUsers}</CardContent>
				<CardFooter className="flex flex-row items-center justify-evenly">
					<div className="flex flex-col items-center justify-center">
						<div className="text-sm text-muted-foreground">{"Verified"}</div>
						<div className="text-xl text-muted-foreground">{verifiedUsers}</div>
					</div>
					<Separator orientation="vertical" className="mx-2 h-10 w-px" />
					<div className="flex flex-col items-center justify-center">
						<div className="text-sm text-muted-foreground">{"Verified"}</div>
						<div className="text-xl text-muted-foreground">{total2FAEnabled}</div>
					</div>
				</CardFooter>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>{"Usuários Totais"}</CardTitle>
					<CardDescription />
				</CardHeader>
				<CardContent className="flex items-center justify-center text-4xl">{totalUsers}</CardContent>
				<CardFooter className="flex flex-row items-center justify-evenly">
					<div className="flex flex-col items-center justify-center">
						<div className="text-sm text-muted-foreground">{"Verified"}</div>
						<div className="text-xl text-muted-foreground">{verifiedUsers}</div>
					</div>
					<Separator orientation="vertical" className="mx-2 h-10 w-px" />
					<div className="flex flex-col items-center justify-center">
						<div className="text-sm text-muted-foreground">{"Verified"}</div>
						<div className="text-xl text-muted-foreground">{total2FAEnabled}</div>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default UsersStats;
