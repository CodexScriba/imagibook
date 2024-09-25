// schemas.ts
import * as z from "zod";
import * as m from "@/paraglide/messages";

// Merged schema for step 1 (characters)
export const step1Schema = z.object({
	characters: z
		.array(
			z.object({
				name: z.string().min(1, m.characters_errors_nameRequired()),
				description: z.string().optional(),
			}),
		)
		.min(1, m.characters_errors_atLeastOne()),
});

// Type definitions
export type Step1Values = z.infer<typeof step1Schema>;

// Main form values type (include other steps as needed)
export type FormValues = {
	characters: Step1Values["characters"];
	// Add other fields for other steps
	// storyOverview?: string;
	// ...
};
