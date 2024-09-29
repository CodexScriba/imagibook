// app/book-creation/step-2/page.tsx

"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CreationModeSelector from "../components/CreationModeSelector";
import { useFormData } from "@/app/context/FormContext";
import CardWrapper from "@/app/components/CardWrapper";
import * as m from "@/paraglide/messages";
import { ArrowRightLeft } from "lucide-react";
import { step2Schema } from "@/app/context/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import type { FormValues } from "@/app/context/schemas";

/**
 * The `Step2Page` component is the second step in the book creation process. It allows the user to select the creation mode for their book and provides navigation to the next step.
 *
 * The component uses the `useFormData` hook to access and update the form data in the application context. It also uses the `useForm` hook from `react-hook-form` to manage the form state and validation.
 *
 * When the user submits the form, the `onSubmit` function is called, which updates the form data in the context and navigates to the next step of the book creation process.
 *
 * The `onBack` function is called when the user clicks the "Previous" button, which navigates back to the previous step.
 */

const Step2Page: React.FC = () => {
	const { formData, setFormData } = useFormData();
	const methods = useForm<FormValues>({
		resolver: zodResolver(step2Schema),
		defaultValues: formData,
		mode: "onChange",
	});
	const router = useRouter();

	const onSubmit = (data: FormValues) => {
		// Update the form context with validated data
		setFormData({ ...formData, ...data });

		// Proceed to next step
		router.push("/book-creation/step-3");
	};

	const onBack = () => {
		router.push("/book-creation/step-1");
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-start pt-10 px-4">
			<CardWrapper
				title={
					<div className="flex items-center justify-center">
						<ArrowRightLeft className="mr-2" />
						<span>{m.creationMode_legend()}</span>
					</div>
				}
				description={m.creationMode_description()}
			>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
						<CreationModeSelector />
						<div className="flex justify-between mt-auto">
							<Button type="button" onClick={onBack}>
								{m.buttons_previous()}
							</Button>
							<Button type="submit">{m.buttons_next()}</Button>
						</div>
					</form>
				</FormProvider>
			</CardWrapper>
		</div>
	);
};

export default Step2Page;
