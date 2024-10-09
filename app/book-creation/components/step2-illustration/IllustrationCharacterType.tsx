import React, { useState } from "react";
import { Check, ChevronsUpDown, Info } from "lucide-react";

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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFormContext } from "react-hook-form";
import { animalSuggestions } from "@/constants/IllustrationData";
import * as m from "@/paraglide/messages";

export const IllustrationCharacterType: React.FC = () => {
  const { watch, setValue } = useFormContext();

  const characterType = (watch("characterType") as "human" | "animal") || "animal"; // Default to "animal"
  const animalType = watch("animalType") || "";
  const isAnthropomorphic = watch("isAnthropomorphic") || false;

  const [openCharacterType, setOpenCharacterType] = useState(false);
  const [openAnimalType, setOpenAnimalType] = useState(false);
  const [animalTypeInput, setAnimalTypeInput] = useState(animalType);

  // Define the mapping object
  const characterTypeLabels: Record<"human" | "animal", () => string> = {
    human: m.characterType_human,
    animal: m.characterType_animal,
  };

  return (
    <div className="space-y-4">
      {/* Character Type Selection */}
      <div>
        <Label htmlFor="characterType">{m.characterType_label()}</Label>
        <Popover
          open={openCharacterType}
          onOpenChange={setOpenCharacterType}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
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
                      // Type assertion with validation
                      if (value === "human" || value === "animal") {
                        setValue("characterType", value as "human" | "animal");
                        setOpenCharacterType(false);
                      }
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        characterType === "human"
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {m.characterType_human()}
                  </CommandItem>
                  <CommandItem
                    value="animal"
                    onSelect={(value: string) => {
                      if (value === "human" || value === "animal") {
                        setValue("characterType", value as "human" | "animal");
                        setOpenCharacterType(false);
                      }
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        characterType === "animal"
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {m.characterType_animal()}
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Animal Type Selection */}
      {characterType === "animal" && (
        <>
          <div>
            <Label htmlFor="animalType">{m.animalType_label()}</Label>
            <Popover open={openAnimalType} onOpenChange={setOpenAnimalType}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
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
                              animalType === animal
                                ? "opacity-100"
                                : "opacity-0"
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

          {/* Anthropomorphic Switch */}
          <div className="flex items-center space-x-2">
            <Switch
              id="isAnthropomorphic"
              checked={isAnthropomorphic}
              onCheckedChange={(checked) =>
                setValue("isAnthropomorphic", checked)
              }
            />
            <Label
              htmlFor="isAnthropomorphic"
              className="flex items-center space-x-1"
            >
              <span>{m.isAnthropomorphic_label()}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-500 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  {m.isAnthropomorphic_tooltip()}
                </TooltipContent>
              </Tooltip>
            </Label>
          </div>
        </>
      )}
    </div>
  );
};
