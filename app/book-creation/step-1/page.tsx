// app/book-creation/step-1/page.tsx

"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Characters from "../components/step1-characters/Characters";
import { useFormData } from "@/app/context/FormContext";
import CardWrapper from "@/app/components/CardWrapper";
import * as m from "@/paraglide/messages";
import { UserPlus } from "lucide-react";
import { step1Schema } from "@/app/context/schemas";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FormValues } from "@/app/context/schemas";

const Step1Page: React.FC = () => {
	const { formData, setFormData } = useFormData();
	const methods = useForm<FormValues>({
		resolver: zodResolver(step1Schema),
		defaultValues: formData,
		mode: "onChange",
	});
	const { handleSubmit } = methods;
	const router = useRouter();

	const onSubmit = (data: FormValues) => {
		console.log("Form values:", data);
		// Update the form context with validated data
		setFormData({ ...formData, ...data });

		// Proceed to next step
		router.push("/book-creation/step-1");
	};

	const onBack = () => {
		router.push("/book-creation");
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
				<FormProvider {...methods}>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<Characters />
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

export default Step1Page;
