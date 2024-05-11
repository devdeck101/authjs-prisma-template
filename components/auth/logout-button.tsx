"use client";


import { signOut } from 'next-auth/react';
import React, { ReactNode } from 'react'

type Props = {
    children?: ReactNode
}

const LogoutButton = ({ children }: Props) => {
    return (
        <div onClick={async () => {
            await signOut()
        }}>
            {children}
        </div>
    )
}

export default LogoutButton