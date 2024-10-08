// schemas.ts

import * as z from "zod";
import * as m from "@/paraglide/messages";
import { ageGroups } from "@/constants/ageGroups";
import { IllustrationData } from "@/constants/IllustrationData"; // Import illustrationData

const ageGroupValues = ageGroups.map((ageGroup) => ageGroup.value) as [
  string,
  ...string[],
];

export const characterSchema = z.object({
  name: z.string().min(2, m.characters_errors_nameRequired()),
  isMainCharacter: z.boolean().default(true),
  ageGroup: z.enum(ageGroupValues).optional(),
  description: z.string().optional(),
});

// Step 1 schema (characters)
export const step1Schema = z.object({
  characters: z.array(characterSchema).min(1, m.characters_errors_atLeastOne()),
});

// Extract illustration style values from illustrationData
const illustrationStyleValues = IllustrationData.map(
  (style) => style.value,
) as [string, ...string[]];

// Step 2 schema (illustration style and character type)
export const step2Schema = z.object({
  illustrationStyle: z
    .enum(illustrationStyleValues)
    .refine(
      (value) => illustrationStyleValues.includes(value),
      m.illustration_errors_required(),
    ),
  characterType: z.enum(["human", "animal"]).default("animal"), // Set default to "animal"
  animalType: z.string().optional(),
  isAnthropomorphic: z.boolean().optional(),
});

// Combine step1Schema and step2Schema into a formSchema (if needed)
export const formSchema = step1Schema.merge(step2Schema);

// Update FormValues type
export type FormValues = z.infer<typeof formSchema>;
