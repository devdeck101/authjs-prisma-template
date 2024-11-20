"use client";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
const Step3 = () => {
	const form = useFormContext();
	return (
		<FormField
			control={form.control}
			name="url"
			render={({ field }) => (
				<FormItem>
					<FormLabel>{"Página"}</FormLabel>
					<FormControl>
						<Input placeholder="http://suacampanha.com" {...field} />
					</FormControl>
					<FormDescription>{"Website da campanha."}</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default Step3;
