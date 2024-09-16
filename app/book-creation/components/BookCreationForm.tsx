// BookCreationForm.tsx
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

const formSchema = z.object({
  mode: z.enum(["magicWand", "storybookStudio"]),
  characters: charactersSchema,
  // Add more fields as needed for other form sections
});

type FormValues = z.infer<typeof formSchema>;

const BookCreationForm: React.FC = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mode: "magicWand",
      characters: [{ name: "", description: "" }],
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
            <CardTitle>{m.bookCreationTitle()}</CardTitle>
            <CardDescription>{m.bookCreationDescription()}</CardDescription>
          </CardHeader>
          <CardContent>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                <CreationModeSelector />
                <Characters />
                {/* Add other form sections here */}
                <div className="flex justify-center">
                  <Button type="submit">Submit</Button>
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