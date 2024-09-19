// app/book-creation/step-1/page.tsx
"use client";
import type React from "react";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormDataContext } from "../../context/FormContext";
import { Button } from "@/components/ui/button";
import * as m from "@/paraglide/messages";
import CreationModeSelector from "../components/CreationModeSelector";

// Define the schema for this step
const step1Schema = z.object({
	mode: z.enum(["magicWand", "storybookStudio"]),
});

type Step1FormValues = z.infer<typeof step1Schema>;

const Step1: React.FC = () => {
	const router = useRouter();
	const { formMethods } = useFormDataContext();
	const { handleSubmit } = formMethods;

	const onSubmit = (data: Step1FormValues) => {
		// Data is already updated in formMethods
		router.push("/book-creation/step-2");
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<CreationModeSelector />
			<div className="flex justify-end">
				<Button type="submit">{m.steps_next_button()}</Button>
			</div>
		</form>
	);
};

export default Step1;
