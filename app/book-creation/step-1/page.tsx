// app/book-creation/step-1/page.tsx

"use client";

import type React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, type FormValues } from "@/app/context/schemas";
import { useRouter } from "next/navigation";
import { FormDataProvider } from "@/app/context/FormContext";
import Characters from "../components/step1-characters/Characters";
import { Button } from "@/components/ui/button";
import CardWrapper from "@/app/components/CardWrapper";
import * as m from "@/paraglide/messages";

const PageStep1: React.FC = () => {
	// Initialize the form with react-hook-form and zodResolver for validation
	const methods = useForm<FormValues>({
		resolver: zodResolver(step1Schema),
		defaultValues: {
			characters: [
				{
					name: "",
					isMainCharacter: true,
					ageGroup: "",
					characterType: "animal",
					animalType: "",
					isAnthropomorphic: true,
					description: "",
				},
			],
		},
	});

	const router = useRouter();

	/**
	 * Handles form submission.
	 * Logs the data and navigates to the next step.
	 * @param data - The form data
	 */
	const onSubmit = (data: FormValues) => {
		console.log("Step 1 Data:", data);
		router.push("/step2");
	};

	return (
		<FormDataProvider>
			<FormProvider {...methods}>
				<div className="min-h-screen flex flex-col items-center justify-start px-4">
					<CardWrapper title={m.characters_legend()} description={""}>
						<form onSubmit={methods.handleSubmit(onSubmit)}>
							{/* Characters Component */}
							<Characters />
							{/* Navigation Buttons */}
							<div className="flex justify-end mt-4">
								<Button type="submit">{m.buttons_next()}</Button>
							</div>
						</form>
					</CardWrapper>
				</div>
			</FormProvider>
		</FormDataProvider>
	);
};
export default PageStep1;
