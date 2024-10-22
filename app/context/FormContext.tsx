import type React from "react";
import { createContext, useContext, useState } from "react";
import type { FormValues } from "@/app/context/schemas"; // Ensure you're importing the updated FormValues

type FormContextType = {
	formData: FormValues;
	setFormData: React.Dispatch<React.SetStateAction<FormValues>>;
};

// Create the context
export const FormContext = createContext<FormContextType | null>(null);

interface FormDataProviderProps {
	children: React.ReactNode;
	initialData?: FormValues;
}

// FormDataProvider to supply form data throughout the application
export const FormDataProvider: React.FC<FormDataProviderProps> = ({
	children,
	initialData,
}) => {
	const [formData, setFormData] = useState<FormValues>(
		initialData || {
			characters: [
				{
					name: "",
					isMainCharacter: true,
					ageGroup: "",
					characterType: "animal",
					animalType: "",
					isAnthropomorphic: true,
					description: "",
					dinosaurType: "",
				},
			],
			illustrationStyle: "",
			storyOverview: "",
		},
	);

	return (
		<FormContext.Provider value={{ formData, setFormData }}>
			{children}
		</FormContext.Provider>
	);
};

// Custom hook to access the form data
export const useFormData = () => {
	const context = useContext(FormContext);
	if (!context) {
		throw new Error("useFormData must be used within a FormDataProvider");
	}
	return context;
};
