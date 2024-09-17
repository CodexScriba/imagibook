// BookCreationForm.tsx
"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import * as m from "@/paraglide/messages";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CreationModeSelector from "./CreationModeSelector";
import Characters, { charactersSchema } from "./Characters";
import StoryOverview from "./StoryOverview"; // Import the StoryOverview component

// Define the schema for StoryOverview
const storyOverviewSchema = z
  .string()
  .min(100, "Story Overview must be at least 100 characters long");

// Extend the existing form schema to include storyOverview
const formSchema = z.object({
  mode: z.enum(["magicWand", "storybookStudio"]),
  characters: charactersSchema,
  storyOverview: storyOverviewSchema, // New field
  // Add more fields as needed for other form sections
});

type FormValues = z.infer<typeof formSchema>;

const BookCreationForm: React.FC = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mode: "magicWand",
      characters: [{ name: "", description: "" }],
      storyOverview: "", // Initialize the new field
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="mt-10 w-full flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>{m.bookCreation_title()}</CardTitle>
            <CardDescription>{m.bookCreation_description()}</CardDescription>
          </CardHeader>
          <CardContent>
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <CreationModeSelector />
                <Characters />
                <StoryOverview /> {/* Integrate the StoryOverview component */}
                {/* Add other form sections here */}
                <div className="flex justify-center">
                  <Button type="submit">
                    {m.bookCreation_submitButton()}
                  </Button>
                </div>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookCreationForm;
