import type { UseMultiStepFormTypeOptions } from "@/types/multi-step-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, useState } from "react";
import { type DefaultValues, type FieldValues, useForm } from "react-hook-form";
import type { ZodSchema } from "zod";

/**
 * Creates a multi-step form context and provider component.
 *
 * @template T - The type of the form field values.
 * @template U - The type of the form options.
 *
 * @param {U} initialFormOptions - The initial options for the form.
 * @param {ZodSchema<T>} schema - The validation schema for the form.
 * @param {DefaultValues<T>} initialFormData - The initial data for the form fields.
 *
 * @returns {{
 *   FormContext: React.Context<UseMultiStepFormTypeOptions<T>>,
 *   FormProvider: React.FC<{ children: React.ReactNode }>
 * }} An object containing the form context and provider component.
 */
export default function buildMultiStepForm<T extends FieldValues, U extends UseMultiStepFormTypeOptions<T>>(
	initialFormOptions: U,
	schema: ZodSchema<T>,
	initialFormData: DefaultValues<T>,
) {
	const FormContext = createContext<UseMultiStepFormTypeOptions<T>>(initialFormOptions);
	const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
		const [currentStep, setCurrentStep] = useState(initialFormOptions.currentStep);
		const form = useForm<T>({
			resolver: zodResolver(schema),
			defaultValues: initialFormData,
		});

		return (
			<FormContext.Provider value={{ ...initialFormOptions, setCurrentStep, currentStep, form }}>
				{children}
			</FormContext.Provider>
		);
	};
	return {
		FormContext,
		FormProvider,
	};
}
