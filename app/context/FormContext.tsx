/**
 * Provides a React context for managing form data in a React application.
 *
 * The `FormContext` context provides access to the current form data and a function to update it. The `FormDataProvider` component is used to wrap the parts of the application that need access to the form data.
 *
 * The initial form data is provided as an optional prop to the `FormDataProvider` component. If no initial data is provided, the form data will be initialized with a single character object.
 *
 * The `useFormData` hook can be used to access the form data and the update function within the components that are wrapped by the `FormDataProvider`.
 */
// context/FormContext.tsx

import { createContext, useContext, useState } from "react";
import type { FormValues } from "./schemas";

type FormContextType = {
	formData: FormValues;
	setFormData: React.Dispatch<React.SetStateAction<FormValues>>;
};

export const FormContext = createContext<FormContextType | null>(null);

interface FormDataProviderProps {
	children: React.ReactNode;
	initialData?: FormValues;
}

export const FormDataProvider: React.FC<FormDataProviderProps> = ({
	children,
	initialData,
}) => {
	const [formData, setFormData] = useState<FormValues>(
		initialData || {
			characters: [
				{
					name: "",
					isMainCharacter: true, // This remains true for the first character
					ageGroup: "",
					description: "",
				},
			],
		},
	);

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
