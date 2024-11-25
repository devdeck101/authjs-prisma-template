"use client";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
const Step2 = () => {
	const form = useFormContext();
	return (
		<FormField
			control={form.control}
			name="owner"
			render={({ field }) => (
				<FormItem>
					<FormLabel>{"Administrador"}</FormLabel>
					<FormControl>
						<Input placeholder="Dono da Campanha" {...field} />
					</FormControl>
					<FormDescription>{"Este é o Administrador da campanha"}</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default Step2;
