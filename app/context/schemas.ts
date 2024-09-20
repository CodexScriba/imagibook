// schemas.ts
import * as z from "zod";
import * as m from "@/paraglide/messages";

// Character Schema
export const characterSchema = z.object({
	name: z.string().min(1, m.characters_errors_nameRequired()),
	description: z.string().optional(),
});

// Characters Array Schema
export const charactersSchema = z
	.array(characterSchema)
	.min(1, m.characters_errors_atLeastOne());

// Story Overview Schema
export const storyOverviewSchema = z
	.string()
	.min(100, m.storyOverview_errors_minLength());

// Main Form Schema
export const formSchema = z.object({
	mode: z.enum(["magicWand", "storybookStudio"]),
	characters: charactersSchema,
	storyOverview: storyOverviewSchema,
	// Add more fields as needed for other form sections
});

export type FormValues = z.infer<typeof formSchema>;
