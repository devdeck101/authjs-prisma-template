"use client";
import { verifyToken } from "@/actions/auth";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import AuthCard from "./auth-card";
import AuthFormMessage from "./auth-form-message";

const EmailVerificationForm = () => {
	const [error, setError] = useState<string | undefined>(undefined);
	const [success, setSuccess] = useState<string | undefined>(undefined);
	const searchParam = useSearchParams();
	const token = searchParam.get("token");

	const automaticSubmission = useCallback(() => {
		if (error || success) return;

		if (!token) {
			setError("Token inválido");
			return;
		}

		verifyToken(token)
			.then((data) => {
				setSuccess(data.success);
				setError(data.error);
			})
			.catch(() => {
				setError("Algo deu errado");
			});
	}, [token, success, error]);

	useEffect(() => {
		automaticSubmission();
	}, [automaticSubmission]);
	return (
		<div className="flex flex-1 justify-center items-center">
			<AuthCard title="Verifique seu E-mail">
				{success && <AuthFormMessage title="Sucesso" type="success" message={success} />}
				{error && <AuthFormMessage title="Encontramos um problema" type="error" message={error} />}
			</AuthCard>
		</div>
	);
};

export default EmailVerificationForm;
