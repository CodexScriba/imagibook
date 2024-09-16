import React from "react";
import { useFieldArray, useFormContext, FieldErrors } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";
import { z } from "zod";

const characterSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().optional(),
});

export const charactersSchema = z.array(characterSchema).min(1, "At least one character is required");

type CharacterFormData = z.infer<typeof charactersSchema>;

const ErrorMessage: React.FC<{ message?: string }> = ({ message }) => {
  return message ? <p className="text-sm text-red-500">{message}</p> : null;
};

const Characters: React.FC = () => {
  const { control, register, formState: { errors } } = useFormContext<{ characters: CharacterFormData }>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "characters",
  });

  const characterErrors = errors.characters as FieldErrors<CharacterFormData>;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Please provide a name and (optional) description of the main characters in your story.
      </p>
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Input {...register(`characters.${index}.name`)} placeholder="Noah" className="flex-grow" />
            {fields.length > 1 && (
              <Button type="button" variant="outline" size="icon" onClick={() => remove(index)}>
                <Minus className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Input {...register(`characters.${index}.description`)} placeholder="3-year-old blonde, green eyes. (Optional)" />
          <ErrorMessage message={characterErrors?.[index]?.name?.message} />
        </div>
      ))}
      <div className="flex justify-end">
        <Button type="button" variant="outline" size="icon" onClick={() => append({ name: "", description: "" })}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {characterErrors && <ErrorMessage message={characterErrors.root?.message} />}
    </div>
  );
};

export default Characters;