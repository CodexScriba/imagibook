// constants/ageGroups.ts

import * as m from "@/paraglide/messages";

// This constant is used in components/AgeGroupSelect.tsx
export const ageGroups = [
	{ value: "", label: m.characters_placeholders_ageGroup() },
	{ value: "Baby 0-1", label: m.characters_ageGroup_baby() },
	{ value: "Toddler 1-3", label: m.characters_ageGroup_toddler() },
	{ value: "Kid 3-12", label: m.characters_ageGroup_kid() },
	{ value: "Teen 13-19", label: m.characters_ageGroup_teen() },
	{ value: "Adult 20-65", label: m.characters_ageGroup_adult() },
	{ value: "Elderly 65+", label: m.characters_ageGroup_elderly() },
];

// Note: This array is imported and used in components/AgeGroupSelect.tsx
// to populate the options for the age group selection dropdown.
