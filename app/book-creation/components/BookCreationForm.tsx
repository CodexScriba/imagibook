"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import * as m from "@/paraglide/messages";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CreationModeSelector from "./CreationModeSelector"; // Import the new component

const formSchema = z.object({
	// Define your form schema here (if any AI inputs or configurations are needed)
});

type FormValues = z.infer<typeof formSchema>;

const BookCreationForm: React.FC = () => {
	const [mode, setMode] = useState<"magicWand" | "storybookStudio">(
		"magicWand",
	); // State to handle mode selection

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			// Set your default values here, if any
		},
	});

	const onSubmit = (data: FormValues) => {
		console.log({ ...data, mode }); // Log the form data along with the selected mode
		// Handle form submission, likely passing the mode to the AI for processing
	};

	return (
		<div className="mt-10 w-full flex items-center justify-center">
			<div className="w-full max-w-2xl">
				<Card>
					<CardHeader className="text-center">
						<CardTitle>{m.bookCreationTitle()}</CardTitle>
						<CardDescription>{m.bookCreationDescription()}</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
								{/* Creation Mode Selector */}
								<CreationModeSelector mode={mode} onModeChange={setMode} />

								<div className="flex justify-center">
									<Button type="submit">Submit</Button>
								</div>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default BookCreationForm;
