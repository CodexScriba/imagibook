// context/FormContext.tsx
"use client";

import type React from "react";
import { createContext, useContext } from "react";
import { useForm, type UseFormReturn, FormProvider } from "react-hook-form"; // Import FormProvider
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type FormValues } from "./schemas";

type FormContextType = UseFormReturn<FormValues>;

const FormContext = createContext<FormContextType | null>(null);

export const FormDataProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const methods = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			characters: [{ name: "", description: "" }],
			mode: "magicWand",
			storyOverview: "",
			// Initialize other default values as needed
		},
	});

	return (
		<FormContext.Provider value={methods}>
			{/* Wrap children with FormProvider */}
			<FormProvider {...methods}>{children}</FormProvider>
		</FormContext.Provider>
	);
};

export const useFormData = () => {
	const context = useContext(FormContext);
	if (!context) {
		throw new Error("useFormData must be used within a FormDataProvider");
	}
	return context;
};
