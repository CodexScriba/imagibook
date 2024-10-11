// context/FormContext.tsx

import { createContext, useContext, useState } from "react";
import type { FormValues } from "@/app/context/schemas";

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
          isMainCharacter: true,
          ageGroup: "",
          description: "",
        },
      ],
      characterType: "animal",
      animalType: "",
      isAnthropomorphic: false,
    }
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
