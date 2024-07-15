"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import MultiStepForm from "@/components/ui/extension/multi-step-form/multi-step-form";
import MultiStepNavButtons from "@/components/ui/extension/multi-step-form/multi-step-nav-buttons";
import MultiStepNavbar from "@/components/ui/extension/multi-step-form/multi-step-navbar";
import { containerCampaignForm as container } from "@/constants/framer-motion";
import { useMultiStepForm } from "@/hooks/multi-step-form";
import { motion } from "framer-motion";
import { CampaignFormContext } from "./multi-step-campaign-config";

const CampaignForm = () => {
	const { CurrentForm } = useMultiStepForm(CampaignFormContext);

	return (
		<MultiStepForm title="Campanha" description="Entre com as informações da Campanha">
			<MultiStepNavbar context={CampaignFormContext} />
			<div className="flex flex-col flex-1 border p-2 min-w-fit">
				<motion.div variants={container} className="flex flex-col gap-2" initial="hidden" animate="visible" exit="exit">
					<CurrentForm />
				</motion.div>
				<MultiStepNavButtons
					context={CampaignFormContext}
					previousLabel="Anterior"
					nextLabel="Próximo"
					endStepLabel="Finalizar"
				/>
			</div>
		</MultiStepForm>
	);
};

export default CampaignForm;
