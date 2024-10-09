// components/IllustrationCharacterType.tsx

"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import React from "react";
import { animalSuggestions } from "@/constants/IllustrationData";

export const IllustrationCharacterType: React.FC = () => {
    const { watch, setValue } = useFormContext();
  
    const characterType = watch("characterType") || "human";
    const animalType = watch("animalType") || "";
    const isAnthropomorphic = watch("isAnthropomorphic") || false;

    return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="characterType">Character Type</Label>
            <Select
              onValueChange={(value) => setValue("characterType", value)}
              value={characterType}
            >
              <SelectTrigger id="characterType">
                <SelectValue placeholder="Select character type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="human">Human</SelectItem>
                <SelectItem value="animal">Animal</SelectItem>
              </SelectContent>
            </Select>
          </div>
    
          {characterType === "animal" && (
            <>
              <div>
                <Label htmlFor="animalType">Animal Type</Label>
                <Input
                  id="animalType"
                  value={animalType}
                  onChange={(e) => setValue("animalType", e.target.value)}
                  placeholder="e.g., bear, monkey, frog, rabbit"
                  list="animal-suggestions"
                />
                <datalist id="animal-suggestions">
                  {animalSuggestions.map((animal) => (
                    <option key={animal} value={animal} />
                  ))}
                </datalist>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isAnthropomorphic"
                  checked={isAnthropomorphic}
                  onCheckedChange={(checked) => setValue("isAnthropomorphic", checked)}
                />
                <Label htmlFor="isAnthropomorphic">Anthropomorphic</Label>
              </div>
            </>
          )}
        </div>
      );
    };