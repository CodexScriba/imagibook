// app/context/FormContext.tsx
"use client";
import type React from "react";
import { createContext, useContext, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import * as m from "@/paraglide/messages";

// Define your form schema
const characterSchema = z.object({
	name: z.string().min(1, m.characters_errors_nameRequired()),
	description: z.string().optional(),
});
const storyOverviewSchema = z
	.string()
	.min(100, m.storyOverview_errors_minLength());
    
const formSchema = z.object({
	mode: z.enum(["magicWand", "storybookStudio"]),
	characters: z.array(characterSchema).min(1, m.characters_errors_atLeastOne()),
	storyOverview: storyOverviewSchema,
	// ...other fields
});

type FormValues = z.infer<typeof formSchema>;

interface FormContextProps {
	formData: FormValues;
	updateFormData: (data: Partial<FormValues>) => void;
	resetFormData: () => void;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const useFormContextData = () => {
	const context = useContext(FormContext);
	if (!context) {
		throw new Error("useFormContextData must be used within a FormProvider");
	}
	return context;
};

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [formData, setFormData] = useState<FormValues>({
		mode: "magicWand",
		characters: [{ name: "", description: "" }],
		storyOverview: "",
		// ...initialize other fields
	});

	const updateFormData = (data: Partial<FormValues>) => {
		setFormData((prev) => ({ ...prev, ...data }));
	};

	const resetFormData = () => {
		setFormData({
			mode: "magicWand",
			characters: [{ name: "", description: "" }],
			storyOverview: "",
			// ...reset other fields
		});
	};

	return (
		<FormContext.Provider value={{ formData, updateFormData, resetFormData }}>
			{children}
		</FormContext.Provider>
	);
};
