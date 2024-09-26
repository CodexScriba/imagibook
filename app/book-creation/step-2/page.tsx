// app/book-creation/step-1/page.tsx

"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Characters from "../components/Characters";
import { useFormData } from "@/app/context/FormContext";
import CardWrapper from "@/app/components/CardWrapper";
import * as m from "@/paraglide/messages";
import { UserPlus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema } from "@/app/context/schemas";
import { ZodError } from "zod";

const Step1Page: React.FC = () => {
	const methods = useFormData();
	const router = useRouter();

	const onSubmit = async (data: any) => {
		try {
			// Validate data for step 1
			const validatedData = await step1Schema.parseAsync({
				characters: data.characters,
			});

			// Update the form context with validated data
			methods.reset({ ...methods.getValues(), ...validatedData });

			// Proceed to next step
			router.push("/book-creation/step-2");
		} catch (error) {
			if (error instanceof ZodError) {
				const fieldErrors = error.flatten().fieldErrors;
				Object.entries(fieldErrors).forEach(([field, messages]) => {
					methods.setError(field as any, {
						type: "manual",
						message: messages?.[0],
					});
				});
			}
		}
	};

	const onBack = () => {
		router.back();
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-start pt-10 px-4">
			<CardWrapper
				title={
					<div className="flex items-center justify-center">
						<UserPlus className="mr-2" />
						<span>{m.characters_legend()}</span>
					</div>
				}
				description={m.characters_description()}
			>
				<form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
					<Characters />
					<div className="flex justify-between mt-auto">
						<Button type="button" onClick={onBack}>
							{m.buttons_previous()}
						</Button>
						<Button type="submit">{m.buttons_next()}</Button>
					</div>
				</form>
			</CardWrapper>
		</div>
	);
};

export default Step1Page;
