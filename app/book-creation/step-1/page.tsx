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
import { Users } from "lucide-react";

const PageStep1: React.FC = () => {
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

	const onSubmit = (data: FormValues) => {
		console.log("Step 1 Data:", data);
		router.push("/book-creation/step-2");
	};

	return (
		<FormDataProvider>
			<FormProvider {...methods}>
				<div className="min-h-screen flex flex-col items-center justify-center px-4">
					<CardWrapper
						title={
							<div className="flex items-center justify-center">
								<Users className="mr-2" />
								{m.characters_legend()}
							</div>
						}
						description={m.characters_description()}
					>
						<form
							onSubmit={methods.handleSubmit(onSubmit)}
							className="flex flex-col items-center"
						>
							{/* Characters Component */}
							<Characters />
							{/* Navigation Buttons */}
							<div className="mt-4 w-full flex justify-end pb-4">
								<Button type="submit" className="text-base px-6 py-3">
									{m.buttons_next()}
								</Button>
							</div>
						</form>
					</CardWrapper>
				</div>
			</FormProvider>
		</FormDataProvider>
	);
};
export default PageStep1;
