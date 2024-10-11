// schemas.ts

import * as z from "zod";
import * as m from "@/paraglide/messages";
import { ageGroups } from "@/constants/ageGroups";

const ageGroupValues = ageGroups.map((ageGroup) => ageGroup.value) as [
  string,
  ...string[]
];

export const characterSchema = z.object({
  name: z.string().min(2, m.characters_errors_nameRequired()),
  isMainCharacter: z.boolean().default(true),
  ageGroup: z.enum(ageGroupValues).optional(),
  description: z.string().optional(),
});

// Step 1 schema (characters and character type)
export const step1Schema = z.object({
  characters: z.array(characterSchema).min(1, m.characters_errors_atLeastOne()),
  characterType: z.enum(["human", "animal"]).default("animal"),
  animalType: z.string().optional(),
  isAnthropomorphic: z.boolean().optional(),
});

// Define the overall form schema
export const formSchema = step1Schema; // If you have more steps, you can merge schemas accordingly

export type FormValues = z.infer<typeof formSchema>;
