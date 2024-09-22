// app/book-creation/step-1/page.tsx
"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Characters from "../components/Characters";
import { useFormData } from "@/app/context/FormContext";
import CardWrapper from "@/app/components/CardWrapper";
import * as m from "@/paraglide/messages";
import { UserRoundPlus } from "lucide-react";

const Step1Page: React.FC = () => {
	const methods = useFormData();
	const router = useRouter();

	const onSubmit = (data: {
		characters: { name: string; description?: string | undefined }[];
	}) => {
		router.push("/book-creation/step-3");
	};

	const onBack = () => {
		router.back();
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-start pt-10 px-4">
			<CardWrapper
				title={
					<div className="flex items-center justify-center">
						<UserRoundPlus className="mr-2" />
						<span>{m.characters_legend()}</span>
					</div>
				}
				description={m.characters_description()}
			>
				<form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
					<Characters />
					<div className="flex justify-between mt-auto">
						<Button type="button" onClick={onBack}>
							Previous
						</Button>
						<Button type="submit">Next</Button>
					</div>
				</form>
			</CardWrapper>
		</div>
	);
};

export default Step1Page;
