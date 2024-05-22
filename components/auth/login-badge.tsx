"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CircleUser, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import LogoutButton from "./logout-button"
import LoginButton from "./login-button"
import { User } from "next-auth"

type Props = {
    user?: User
}

const LoginBadge = ({ user }: Props) => {
    return (
        <>
            {user && (<DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar>
                        <AvatarImage src={user?.image || ""} />
                        <AvatarFallback className="bg-green-500">
                            <CircleUser className="h-5 w-5" />
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <LogoutButton>
                        <DropdownMenuItem>
                            <Button variant={"ghost"} className="flex flex-1 justify-between" >
                                <LogOut /> Sair
                            </Button>
                        </DropdownMenuItem>
                    </LogoutButton>
                </DropdownMenuContent>
            </DropdownMenu>)}
            {!user && (<LoginButton>
                <Button variant={"default"}>
                    Entrar
                </Button>
            </LoginButton>)}
        </>
    )
}

export default LoginBadge