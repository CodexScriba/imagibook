// schemas.ts
import * as z from "zod";
import * as m from "@/paraglide/messages";

// Step 1 schema (characters)
export const step1Schema = z.object({
	characters: z
		.array(
			z.object({
				name: z
					.string()
					.min(2, m.characters_errors_nameRequired())
					.refine((val) => (val.match(/[A-Za-z]/g) || []).length >= 2, {
						message: m.characters_errors_nameRequired(),
					}),
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

// Type definitions for each step
export type Step1Values = z.infer<typeof step1Schema>;
export type Step2Values = z.infer<typeof step2Schema>;
