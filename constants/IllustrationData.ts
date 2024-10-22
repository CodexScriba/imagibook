// app/constants/illustrationData.ts
import * as m from "@/paraglide/messages";

export interface IllustrationStyle {
	value:
		| "Disney Style"
		| "Aquarelle"
		| "Storybook Illustration"
		| "Pixar Style"
		| "Manga"
		| "Flat Design";
	title: string;
	description: string;
	image: string;
}

export const animalSuggestions = [
	m.animalSuggestion_one(),
	m.animalSuggestion_two(),
	m.animalSuggestion_three(),
	m.animalSuggestion_four(),
	m.animalSuggestion_five(),
	m.animalSuggestion_six(),
	m.animalSuggestion_seven(),
	m.animalSuggestion_eight(),
	m.animalSuggestion_nine(),
	m.animalSuggestion_ten(),
];

export const dinosaurSuggestions = [
	m.dinosaurSuggestion_one(),
	m.dinosaurSuggestion_two(),
	m.dinosaurSuggestion_three(),
	m.dinosaurSuggestion_four(),
	m.dinosaurSuggestion_five(),
	m.dinosaurSuggestion_six(),
	m.dinosaurSuggestion_seven(),
	m.dinosaurSuggestion_eight()
  ];

export const IllustrationData: IllustrationStyle[] = [
	{
		value: "Disney Style",
		title: m.illustrationData_disneyStyle_title(),
		description: m.illustrationData_disneyStyle_description(),
		image: "/placeholder.svg?height=200&width=300",
	},
	{
		value: "Aquarelle",
		title: m.illustrationData_aquarelle_title(),
		description: m.illustrationData_aquarelle_description(),
		image: "/placeholder.svg?height=200&width=300",
	},
	{
		value: "Storybook Illustration",
		title: m.illustrationData_storybookIllustration_title(),
		description: m.illustrationData_storybookIllustration_description(),
		image: "/placeholder.svg?height=200&width=300",
	},
	{
		value: "Pixar Style",
		title: m.illustrationData_pixarStyle_title(),
		description: m.illustrationData_pixarStyle_description(),
		image: "/placeholder.svg?height=200&width=300",
	},
	{
		value: "Manga",
		title: m.illustrationData_manga_title(),
		description: m.illustrationData_manga_description(),
		image: "/placeholder.svg?height=200&width=300",
	},
	{
		value: "Flat Design",
		title: m.illustrationData_flatDesign_title(),
		description: m.illustrationData_flatDesign_description(),
		image: "/placeholder.svg?height=200&width=300",
	},
];


