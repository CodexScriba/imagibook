/**
 * Defines the schema for individual characters in the application.
 * The `characterSchema` object defines the shape of a character, including:
 * - `name`: a string with a minimum length of 2 characters, with an error message if the name is required
 * - `isMainCharacter`: a boolean that defaults to `true`
 * - `ageGroup`: an optional enum representing the character's age group
 * - `description`: an optional string description of the character
 *
 * The `step1Schema` object defines the schema for the first step of the application, which includes an array of characters with at least one character.
 *
 * The `FormValues` type is an inferred type from the `step1Schema`, representing the shape of the form values for the first step.
 */
// schemas.ts

import * as z from "zod";
import * as m from "@/paraglide/messages";

// Define a schema for individual characters
export const characterSchema = z.object({
	name: z.string().min(2, m.characters_errors_nameRequired()),
	isMainCharacter: z.boolean().default(true),
	ageGroup: z
		.enum([
			"",
			"Baby 0-1",
			"Toddler 1-3",
			"Kid 3-12",
			"Teen 13-19",
			"Adult 20-65",
			"Elderly 65+",
		])
		.optional(),
	description: z.string().optional(),
});

// Step 1 schema (characters)
export const step1Schema = z.object({
	characters: z.array(characterSchema).min(1, m.characters_errors_atLeastOne()),
});

// Define FormValues inferred from step1Schema
export type FormValues = z.infer<typeof step1Schema>;
