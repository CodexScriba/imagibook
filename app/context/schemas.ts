import * as z from "zod";
import * as m from "@/paraglide/messages";
import { ageGroups } from "@/constants/ageGroups";

// Extract age group values for the enum
const ageGroupValues = ageGroups.map((ageGroup) => ageGroup.value) as [
  string,
  ...string[],
];

/**
 * Schema for an individual character.
 */
export const characterSchema = z.object({
  name: z.string().min(2, m.characters_errors_nameRequired()),
  isMainCharacter: z.boolean().default(true),
  ageGroup: z.enum(ageGroupValues).optional(),
  characterType: z.enum(["human", "animal"]).default("animal"),
  animalType: z.string().optional(),
  isAnthropomorphic: z.boolean().optional(),
  description: z.string().optional(),
});

/**
 * Schema for Step 1 of the form.
 */
export const step1Schema = z.object({
  characters: z.array(characterSchema).min(1, m.characters_errors_atLeastOne()),
});

/**
 * Schema for Step 2 of the form.
 */
export const step2Schema = z.object({
  illustrationStyle: z.string().min(1, m.illustration_errors_required()),
});

/**
 * Overall form schema combining step1 and step2 schemas.
 */
export const formSchema = step1Schema.merge(step2Schema);

// Type inferred from the form schema
export type FormValues = z.infer<typeof formSchema>;
