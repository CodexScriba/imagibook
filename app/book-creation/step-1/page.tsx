"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Characters from "../components/Characters";
import { useFormData } from "@/app/context/FormContext";
import CardWrapper from "@/app/components/CardWrapper";
import * as m from "@/paraglide/messages";
import { UserPlus } from "lucide-react";

const Step1Page: React.FC = () => {
	const methods = useFormData();
	const router = useRouter();

	const onSubmit = (data: {
		characters: { name: string; description?: string }[];
	}) => {
		console.log("Step 1 Data:", data);
		// You can store the data in a state management solution or pass it to the next step
		router.push("/book-creation/step-2");
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
