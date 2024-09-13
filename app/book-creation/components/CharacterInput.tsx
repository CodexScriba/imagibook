import React from 'react';
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";

const CharacterInput = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "characters"
  });

  return (
    <div className="space-y-4">
      <FormLabel>Characters</FormLabel>
      <FormDescription>
        Main characters in your tale, include details as possible.
      </FormDescription>
      {fields.map((field, index) => (
        <FormField
          key={field.id}
          control={control}
          name={`characters.${index}.name`}
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormLabel className="min-w-[100px]">Character {index + 1}:</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="e.g. John, a 3-year old bear with blue eyes, wearing a red cap"
                />
              </FormControl>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => remove(index)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={() => append({ name: "" })}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Character
      </Button>
    </div>
  );
};

export default CharacterInput;