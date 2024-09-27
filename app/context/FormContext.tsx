// context/FormContext.tsx

import { createContext, useContext } from "react";
import { useForm, type UseFormReturn, FormProvider } from "react-hook-form";
import { FormValues } from "./schemas";

type FormContextType = UseFormReturn<FormValues>;

export const FormContext = createContext<FormContextType | null>(null);

export const FormDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      characters: [{ name: "", description: "" }],
      mode: "undefined",
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
