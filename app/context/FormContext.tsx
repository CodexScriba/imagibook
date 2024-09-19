// app/context/FormContext.tsx
"use client";
import type React from "react";
import { createContext, useContext } from "react";
import {
	useForm,
	type UseFormReturn,
	FormProvider as RHFFormProvider,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define sub-schemas
const step1Schema = z.object({
	mode: z.enum(["magicWand", "storybookStudio"]),
});

const characterSchema = z.object({
	name: z.string().min(1, "Name is required"),
	description: z.string().optional(),
});
const step2Schema = z.object({
	characters: z
		.array(characterSchema)
		.min(1, "At least one character is required"),
});

// ... other step schemas

// Combine into a global schema
const formSchema = step1Schema.merge(step2Schema); // Extend as needed

type FormValues = z.infer<typeof formSchema>;

interface FormContextProps {
	formMethods: UseFormReturn<FormValues>;
	resetFormData: () => void;
}

const FormDataContext = createContext<FormContextProps | undefined>(undefined);

export const useFormDataContext = () => {
	const context = useContext(FormDataContext);
	if (!context) {
		throw new Error(
			"useFormDataContext must be used within a FormDataProvider",
		);
	}
	return context;
};

export const FormDataProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const formMethods = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			mode: "magicWand",
			characters: [{ name: "", description: "" }],
			// ...initialize other fields
		},
		mode: "onBlur",
	});

	const resetFormData = () => {
		formMethods.reset();
	};

	return (
		<FormDataContext.Provider value={{ formMethods, resetFormData }}>
			<RHFFormProvider {...formMethods}>{children}</RHFFormProvider>
		</FormDataContext.Provider>
	);
};
