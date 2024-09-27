// app/book-creation/step-2/page.tsx

"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CreationModeSelector from "../components/CreationModeSelector";
import { useFormData } from "@/app/context/FormContext";
import CardWrapper from "@/app/components/CardWrapper";
import * as m from "@/paraglide/messages";
import { ArrowRightLeft } from "lucide-react";
import { step2Schema } from "@/app/context/schemas";
import { ZodError } from "zod";
import { FormValues } from "@/app/context/schemas";

const Step2Page: React.FC = () => {
  const methods = useFormData();
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      // Validate data for step 2
      const validatedData = step2Schema.parse({
        mode: data.mode,
      });

      // Update the form context with validated data
      methods.reset({ ...methods.getValues(), ...validatedData });

      // Proceed to next step
      router.push("/book-creation/step-3");
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        Object.entries(fieldErrors).forEach(([field, messages]) => {
          methods.setError(field as keyof FormValues, {
            type: "manual",
            message: messages?.[0],
          });
        });
      }
    }
  };

  const onBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-10 px-4">
      <CardWrapper
        title={
          <div className="flex items-center justify-center">
            <ArrowRightLeft className="mr-2" />
            <span>{m.creationMode_legend()}</span>
          </div>
        }
        description={m.creationMode_description()}
      >
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <CreationModeSelector />
          <div className="flex justify-between mt-auto">
            <Button type="button" onClick={onBack}>
              {m.buttons_previous()}
            </Button>
            <Button type="submit">{m.buttons_next()}</Button>
          </div>
        </form>
      </CardWrapper>
    </div>
  );
};

export default Step2Page;
