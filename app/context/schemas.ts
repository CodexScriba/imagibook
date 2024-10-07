/**
 * This file defines the Zod schemas for the character and step1 form data.
 *
 * The `characterSchema` defines the schema for a single character, including fields for name, whether it is the main character, age group, and an optional description.
 *
 * The `step1Schema` defines the schema for the first step of the form, which includes an array of characters that must have at least one element.
 *
 * The `FormValues` type is an inferred type from the `step1Schema`, representing the shape of the form data for the first step.
 */
// schemas.ts

import * as z from "zod";
import * as m from "@/paraglide/messages";
import { ageGroups } from "@/constants/ageGroups";

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

// Step 2 schema (illustration style)
export const step2Schema = z.object({
	
})

// Define FormValues inferred from step1Schema
export type FormValues = z.infer<typeof step1Schema>;
