"use client";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useFormContext } from "react-hook-form";
const Step1 = () => {
	const { control } = useFormContext();
	return (
		<Card className="border-none">
			<CardHeader className="pl-0">
				<CardTitle>{"Nomear sua campanha"}</CardTitle>
				<CardDescription>{"O Nome será usado em relatórios"}</CardDescription>
			</CardHeader>
			<FormField
				control={control}
				name="name"
				render={({ field }) => (
					<FormItem>
						<FormLabel>{"Nome"}</FormLabel>
						<FormControl>
							<Input placeholder="Capanha para Devs" {...field} />
						</FormControl>
						<FormDescription>{"Nome público da campanha."}</FormDescription>
						<FormMessage />
					</FormItem>
				)}
			/>
		</Card>
	);
};

export default Step1;
