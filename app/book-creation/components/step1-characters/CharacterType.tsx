// app/book-creation/components/step1-characters/CharacterType.tsx

import React, { useState } from "react"; // Corrected import
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { animalSuggestions } from "@/constants/IllustrationData";
import * as m from "@/paraglide/messages";

const CharacterType: React.FC = () => {
  const { watch, setValue } = useFormContext();

  // Watch the values of characterType, animalType, and isAnthropomorphic
  const characterType =
    (watch("characterType") as "human" | "animal" | "dinosaur") || "animal";
  const animalType = watch("animalType") || "";
  const isAnthropomorphic = watch("isAnthropomorphic") || false;

  // State to manage the visibility of popovers
  const [openCharacterType, setOpenCharacterType] = useState(false);
  const [openAnimalType, setOpenAnimalType] = useState(false);

  // Local state for animalType input to handle dynamic suggestions
  const [animalTypeInput, setAnimalTypeInput] = useState(animalType);

  // Define the mapping object for character type labels
  const characterTypeLabels: Record<"human" | "animal" | "dinosaur", () => string> = {
    human: m.characterType_human,
    animal: m.characterType_animal,
    dinosaur: m.characterType_dinosaur,
  };

  return (
    <div className="space-y-4">
      {/* 
        Character Type Selection
        Allows the user to select between 'human' and 'animal'
      */}
      <div>
        <Label htmlFor="characterType" className="text-foreground">
          {m.characterType_label()}
        </Label>
        <Popover open={openCharacterType} onOpenChange={setOpenCharacterType}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              aria-expanded={openCharacterType}
              className="w-full justify-between"
            >
              {characterType
                ? characterTypeLabels[characterType]()
                : m.characterType_placeholder()}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder={m.characterType_placeholder()} />
              <CommandList>
                <CommandEmpty>{m.characterType_noOptions()}</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    value="human"
                    onSelect={(value: string) => {
                      if (["human", "animal", "dinosaur"].includes(value)) {
                        setValue("characterType", value as "human" | "animal" | "dinosaur");
                        setOpenCharacterType(false);
                      }
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        characterType === "human" ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {m.characterType_human()}
                  </CommandItem>
                  <CommandItem
                    value="animal"
                    onSelect={(value: string) => {
                      if (["human", "animal", "dinosaur"].includes(value)) {
                        setValue("characterType", value as "human" | "animal" | "dinosaur");
                        setOpenCharacterType(false);
                      }
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        characterType === "animal" ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {m.characterType_animal()}
                  </CommandItem>
                  <CommandItem
                    value="dinosaur"
                    onSelect={(value: string) => {
                      if (["human", "animal", "dinosaur"].includes(value)) {
                        setValue("characterType", value as "human" | "animal" | "dinosaur");
                        setOpenCharacterType(false);
                      }
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        characterType === "dinosaur" ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {m.characterType_dinosaur()}
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* 
        Animal Type Selection
        Visible only if the selected character type is 'animal'
      */}
      {characterType === "animal" && (
        <>
          <div>
            <Label htmlFor="animalType" className="text-foreground">
              {m.animalType_label()}
            </Label>
            <Popover open={openAnimalType} onOpenChange={setOpenAnimalType}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  aria-expanded={openAnimalType}
                  className="w-full justify-between"
                >
                  {animalTypeInput || m.animalType_placeholder()}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput
                    placeholder={m.animalType_placeholder()}
                    value={animalTypeInput}
                    onValueChange={(value: string) => {
                      setAnimalTypeInput(value);
                      setValue("animalType", value);
                    }}
                  />
                  <CommandList>
                    <CommandEmpty>{m.animalType_noOptions()}</CommandEmpty>
                    <CommandGroup>
                      {animalSuggestions.map((animal) => (
                        <CommandItem
                          key={animal}
                          value={animal}
                          onSelect={(currentValue: string) => {
                            setAnimalTypeInput(currentValue);
                            setValue("animalType", currentValue);
                            setOpenAnimalType(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              animalTypeInput === animal ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {animal}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* 
            Anthropomorphic Switch
            Allows the user to specify if the animal is anthropomorphic
          */}
          <div className="flex items-center space-x-2">
            <Switch
              id="isAnthropomorphic"
              checked={isAnthropomorphic}
              onCheckedChange={(checked) => setValue("isAnthropomorphic", checked)}
            />
            <Label
              htmlFor="isAnthropomorphic"
              className="flex items-center space-x-1 text-foreground"
            >
              <span>{m.isAnthropomorphic_label()}</span>
              <span className="text-sm text-gray-500">
                {m.isAnthropomorphic_description()}
              </span>
            </Label>
          </div>
        </>
      )}
    </div>
  );
};

export default CharacterType;
