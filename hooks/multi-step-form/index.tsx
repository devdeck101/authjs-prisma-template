import { containerCurrentForm as container } from "@/constants/framer-motion";
import type { UseMultiStepFormTypeOptions } from "@/types/multi-step-form";
import { motion } from "framer-motion";
import { type Context, useCallback, useContext } from "react";
import type { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import type { z } from "zod";

/**
 * Custom hook for managing a multi-step form.
 *
 * @template T - The type of the multi-step form options.
 * @param {Context<T>} context - The React context containing the form state and methods.
 * @returns {Object} An object containing methods and properties for managing the multi-step form.
 * @throws {Error} If the form is not defined in the context.
 */
// biome-ignore lint: must be any as it is a any object
function useMultiStepForm<T extends UseMultiStepFormTypeOptions<any>>(context: Context<T>) {
	const { forms, schema, currentStep, setCurrentStep, form, saveFormData } = useContext(context);
	if (form === undefined) throw new Error("A react-hook-form must be defined");

	const steps = forms.length;

	/**
	 * Advances to the next step if not already at the last step.
	 */
	const nextStep = () => {
		if (currentStep < steps - 1) setCurrentStep((step) => step + 1);
	};

	/**
	 * Goes back to the previous step if not already at the first step.
	 */
	const previousStep = () => {
		if (currentStep > 0) setCurrentStep((step) => step - 1);
	};

	/**
	 * Goes to a specific step.
	 *
	 * @param {number} index - The index of the step to go to.
	 */
	const goToStep = (index: number) => {
		if (index >= 0 && index < steps) setCurrentStep((step) => index);
	};

	/**
	 * Checks if the current step is the first step.
	 *
	 * @returns {boolean} True if the current step is the first step, false otherwise.
	 */
	const isFirstStep = currentStep === 0;

	/**
	 * Checks if the current step is the last step.
	 *
	 * @returns {boolean} True if the current step is the last step, false otherwise.
	 */
	const isLastStep = currentStep === steps - 1;

	/**
	 * Get the current step label.
	 *
	 * @returns {string} The current step label.
	 */
	const currentStepLabel = forms[currentStep].label;

	/**
	 * Handles form submission.
	 *
	 * @param {z.infer<typeof schema>} values - The form values.
	 */
	const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (values) => {
		if (isLastStep) await saveFormData(values);
		nextStep();
	};

	/**
	 * Handles form submission errors by checking if there are errors
	 * in the current step's fields and navigating to the next step if there are none.
	 *
	 * @template T - The type of the form field values.
	 *
	 * @param {SubmitErrorHandler<z.infer<typeof schema>>} errors - The form submission errors.
	 *
	 * @returns {void}
	 */
	const onErrors: SubmitErrorHandler<z.infer<typeof schema>> = (errors) => {
		const stepFields = forms[currentStep].fields.flat();
		const errorFields = new Set(Object.keys(errors).flat());
		let hasStepErrors = false;
		for (const field of stepFields) {
			if (errorFields.has(field as string)) hasStepErrors = true;
		}

		if (!hasStepErrors) {
			form?.clearErrors();
			nextStep();
		}
	};

	/**
	 * Create a string array of labekls
	 *
	 * @returns {string[]} string array of labels
	 */
	const labels = forms.map((form) => form.label);

	const CurrentForm: React.FC = useCallback(() => {
		const Step = forms[currentStep].form;
		return (
			<motion.div variants={container} className="flex flex-col gap-2" initial="hidden" animate="visible" exit="exit">
				<Step />
			</motion.div>
		);
	}, [forms, currentStep]);

	return {
		form,
		currentStep,
		steps,
		nextStep,
		previousStep,
		goToStep,
		isFirstStep,
		isLastStep,
		labels,
		currentStepLabel,
		CurrentForm,
		onSubmit,
		onErrors,
	};
}

export { useMultiStepForm };
