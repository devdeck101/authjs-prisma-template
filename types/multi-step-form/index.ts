import type { Dispatch, SetStateAction } from "react";
import type { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";
import type { ZodSchema } from "zod";

type Form<T> = {
	id: number;
	label: string;
	fields: (keyof T)[];
	form: React.FC;
};

type UseMultiStepFormTypeOptions<T extends FieldValues> = {
	schema: ZodSchema<T>;
	currentStep: number;
	setCurrentStep: Dispatch<SetStateAction<number>>;
	form?: UseFormReturn<T>;
	forms: Form<T>[];
	saveFormData: SubmitHandler<T>;
};

export type { UseMultiStepFormTypeOptions, Form };
