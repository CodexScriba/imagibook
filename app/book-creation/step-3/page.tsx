// app/book-creation/step3/page.tsx

"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import StoryOverview from "../components/StoryOverview";
import { useFormData } from "@/app/context/FormContext";
import CardWrapper from "@/app/components/CardWrapper";
import * as m from "@/paraglide/messages";
import { step3Schema } from "@/app/context/schemas";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FormValues } from "@/app/context/schemas";

const Step3Page: React.FC = () => {
	const { formData, setFormData } = useFormData();
	const methods = useForm<FormValues>({
		resolver: zodResolver(step3Schema),
		defaultValues: {
			...formData,
			storyOverview: formData.storyOverview || "",
		},
		mode: "onBlur",
	});
	const router = useRouter();

	const onSubmit = (data: FormValues) => {
		setFormData({ ...formData, ...data });
		console.log("Story Overview:", data.storyOverview);
		router.push("/book-creation/step-4"); // Adjust the path as needed
	};

	const onBack = () => {
		router.push("/book-creation/step-2");
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-start pt-10 px-4">
			<CardWrapper
				title={
					<div className="flex items-center justify-center">
						<span>{m.step3_title()}</span>
					</div>
				}
				description={m.step3_description()}
			>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
						<StoryOverview />
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

export default Step3Page;
