// app/book-creation/step-1/page.tsx
"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Characters from "../components/Characters";
import { useFormData } from "@/app/context/FormContext";
import CardWrapper from "@/app/components/CardWrapper";
import * as m from "@/paraglide/messages";

const Step1Page: React.FC = () => {
	const methods = useFormData();
	const router = useRouter();

	const onSubmit = (data: {
		characters: { name: string; description?: string | undefined }[];
	}) => {
		// You might want to handle the form data here before navigating
		router.push("/book-creation/step-3");
	};

	const onBack = () => {
		router.back();
	};

	return (
		<CardWrapper
			title={m.characters_legend()}
			description={m.characters_description()}
		>
			<form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
				<Characters />
				<div className="flex justify-between">
					<Button type="button" onClick={onBack}>
						Previous
					</Button>
					<Button type="submit">Next</Button>
				</div>
			</form>
		</CardWrapper>
	);
};

export default Step1Page;
