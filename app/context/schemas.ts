/**
 * This file defines the Zod schemas and types for the form data used in the application.
 *
 * The `step1Schema` defines the schema for the first step of the form, which includes an array of character objects with a name and optional description.
 *
 * The `step2Schema` defines the schema for the second step of the form, which includes an enum for the creation mode.
 *
 * The `FormValues` type explicitly defines the shape of the form data, which includes the characters array and the creation mode.
 */
// schemas.ts

import * as z from "zod";
import * as m from "@/paraglide/messages";

// Step 1 schema (characters)
export const step1Schema = z.object({
	characters: z
		.array(
			z.object({
				name: z.string().min(2, m.characters_errors_nameRequired()),
				description: z.string().optional(),
			}),
		)
		.min(1, m.characters_errors_atLeastOne()),
});

// Step 2 schema (creation mode)
export const step2Schema = z.object({
	mode: z.enum(["magicWand", "storybookStudio"], {
		errorMap: () => ({ message: m.creationMode_errors_required() }),
	}),
});

// Define FormValues explicitly
export type FormValues = {
	characters: {
		name: string;
		description?: string;
	}[];
	mode?: "magicWand" | "storybookStudio";
};
