// pages/step1.tsx

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Step1 from "@/components/Step1";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, FormValues } from "@/app/context/schemas";
import { useRouter } from "next/router";
import { FormDataProvider } from "@/app/context/FormContext";

const PageStep1: React.FC = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
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
    },
  });

  const router = useRouter();

  const onSubmit = (data: FormValues) => {
    // Handle form submission
    console.log("Step 1 Data:", data);
    // Save data to context or state management if needed
    // Navigate to the next step
    router.push("/step2");
  };

  return (
    <FormDataProvider>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Step1 />
          {/* Navigation Buttons */}
          <div className="flex justify-end mt-4">
            <button type="submit" className="btn btn-primary">
              Next
            </button>
          </div>
        </form>
      </FormProvider>
    </FormDataProvider>
  );
};

export default PageStep1;
