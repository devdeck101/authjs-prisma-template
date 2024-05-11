"use client";

import { signIn } from 'next-auth/react';
import React, { ReactNode } from 'react'

type Props = {
    children?: ReactNode
}

const LoginButton = ({ children }: Props) => {
    return (
        <div onClick={async () => {
            signIn();
        }}>
            {children}
        </div>
    )
}

export default LoginButton