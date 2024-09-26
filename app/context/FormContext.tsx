// context/FormContext.tsx

import { createContext, useContext } from "react";
import { useForm, type UseFormReturn, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, type Step1Values } from "./schemas";

type FormContextType = UseFormReturn<Step1Values>;

// Export FormContext
export const FormContext = createContext<FormContextType | null>(null);

export const FormDataProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const methods = useForm<Step1Values>({
		resolver: zodResolver(step1Schema),
		defaultValues: {
			characters: [{ name: "", description: "" }],
		},
	});

	return (
		<FormContext.Provider value={methods}>
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
