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
