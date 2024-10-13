// pages/step1.tsx
"use client";

import type React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, type FormValues } from "@/app/context/schemas";
import { useRouter } from "next/navigation";
import { FormDataProvider } from "@/app/context/FormContext";
import Characters from "../components/step1-characters/Characters";
import { Button } from "@/components/ui/button";

const PageStep1: React.FC = () => {
	const methods = useForm<FormValues>({
		resolver: zodResolver(step1Schema),
		defaultValues: {
			characters: [
				{
					name: "",
					isMainCharacter: true,
					ageGroup: "",
					description: "",
				},
			],
			characterType: "animal",
			animalType: "",
			isAnthropomorphic: false,
		},
	});

	const router = useRouter();

	const onSubmit = (data: FormValues) => {
		// Handle form submission
		console.log("Step 1 Data:", data);
		// Save data to context or state management if needed
		// Navigate to the next step
		router.push("/step2");
	};

	return (
		<FormDataProvider>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<Characters />
					{/* Navigation Buttons */}
					<div className="flex justify-end mt-4">
						<Button>Next</Button>
					</div>
				</form>
			</FormProvider>
		</FormDataProvider>
	);
};

export default PageStep1;
