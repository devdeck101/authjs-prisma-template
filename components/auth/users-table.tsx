"use client"

import { Check, MoreHorizontal, ShieldAlert, ShieldX } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { User } from "@/types/shared"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"

type Props = {
    users: User[];
};
export default function UsersTable({ users }: Props) {
    const [open, setOpen] = useState(false)
    return (
        <Card>
            <CardHeader>
                <CardTitle>Usuários</CardTitle>
                <CardDescription>
                    Gerencie seus usuários
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Verificado</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>2FA Habilidato</TableHead>
                            <TableHead>2FA Verificicado</TableHead>
                            <TableHead>
                                <span className="sr-only">Ações</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            users.length > 0 && users.map(({ id, name, email, emailVerified, role, twoFactorAuthVerified, isTwoFactorAuthEnabled, createdAt }) => (
                                <TableRow key={id}>
                                    <TableCell>{name}</TableCell>
                                    <TableCell>{email}</TableCell>
                                    <TableCell>{emailVerified ? <Check color="#22c55e" /> : <ShieldAlert color="#eab308" />}</TableCell>
                                    <TableCell>{role}</TableCell>
                                    <TableCell>{isTwoFactorAuthEnabled ? <Check color="#22c55e" className="" /> : <ShieldX color="#eab308" />}</TableCell>
                                    <TableCell>{twoFactorAuthVerified ? <Check /> : <ShieldAlert color="#eab308" />}</TableCell>
                                    <TableCell>
                                        <Dialog open={open} onOpenChange={setOpen}>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DialogTrigger asChild>
                                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                            Solicitar Mudança de senha
                                                        </DropdownMenuItem>
                                                    </DialogTrigger>
                                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Solicitação Mudança de senha</DialogTitle>
                                                    <DialogDescription>
                                                        Um E-mail será enviado para que o usuário mude sua senha.
                                                    </DialogDescription>
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong> products
                </div>
            </CardFooter>
        </Card>
    )
}
