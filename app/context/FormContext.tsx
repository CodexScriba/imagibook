/**
 * Provides a React context for managing form data in the application.
 *
 * The `FormContext` context exposes the current form data and a function to update it.
 * The `FormDataProvider` component is used to wrap the parts of the application that need access to the form data.
 * The `useFormData` hook can be used to access the form data and update function within the context.
 */
// context/FormContext.tsx

import { createContext, useContext, useState } from "react";
import type { FormValues } from "./schemas";

type FormContextType = {
	formData: FormValues;
	setFormData: React.Dispatch<React.SetStateAction<FormValues>>;
};

export const FormContext = createContext<FormContextType | null>(null);

export const FormDataProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [formData, setFormData] = useState<FormValues>({
		characters: [{ name: "", description: "" }],
		mode: "magicWand",
	});

	return (
		<FormContext.Provider value={{ formData, setFormData }}>
			{children}
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
