"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useMultiStepForm } from "@/hooks/multi-step-form";
import type { Context } from "react";
import type { UseMultiStepFormTypeOptions } from "@/types/multi-step-form";

interface MultiStepNavButtonsProps<T> {
    previousLabel: string;
    nextLabel: string;
    endStepLabel: string;
    context: Context<T>
    debug?: boolean;
}
// biome-ignore lint: must be any as it is a any object
function MultiStepNavButtons<T extends UseMultiStepFormTypeOptions<any>>({ previousLabel, nextLabel, endStepLabel, debug = false, context }: MultiStepNavButtonsProps<T>) {
    const { currentStep, isFirstStep, isLastStep, goToStep, previousStep } = useMultiStepForm(context)
    return (
        <div className='flex flex-row w-full justify-between mt-4'>
            {debug && (<pre className="flex justify-center items-center absolute w-32 h-32 right-2 bottom-2 bg-yellow-400 text-black text-sm border-2 rounded-md">{`Current Step: ${currentStep}`}</pre>)}
            <Button
                variant={'default'}
                size={'sm'}
                onClick={() => {
                    previousStep()
                }}
                type="button"
                className={cn(`${isFirstStep ? "invisible" : "visible"}`)}

            >{previousLabel}</Button>
            <Button
                variant={'default'}
                size={'sm'}
                type="submit"
            >
                {`${isLastStep ? endStepLabel : nextLabel}`}
            </Button>

        </div>
    )
}

export default MultiStepNavButtons