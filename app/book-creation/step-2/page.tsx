//app/ book-creation-step-2/page.tsx

"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useFormData } from "@/app/context/FormContext";
import CardWrapper from "@/app/components/CardWrapper";
import { step2Schema, type FormValues } from "@/app/context/schemas";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Illustration } from "../components/step2-illustration/Illustration";
import * as m from "@/paraglide/messages";
import { ImageIcon } from "lucide-react";

const Step2Page: React.FC = () => {
	const { formData, setFormData } = useFormData();
	const methods = useForm<FormValues>({
		resolver: zodResolver(step2Schema),
		defaultValues: formData,
		mode: "onChange",
	});
	const { handleSubmit } = methods;
	const router = useRouter();

	//logs the data, updates it to form context, goes to the next step
	const onSubmit = (data: FormValues) => {
		console.log("Form Values at step 2:", data);
		setFormData({ ...formData, ...data }); // Update form data through context
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
						<ImageIcon className="mr-2" />
						<span>{m.illustration_legend()}</span>
					</div>
				}
				description={m.illustration_description()}
			>
				<FormProvider {...methods}>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<Illustration />
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
