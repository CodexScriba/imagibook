import React from "react";
import { render, screen } from "@testing-library/react";
import { AgeGroupSelect } from "../AgeGroupSelect";
import { useForm } from "react-hook-form";
import * as m from "@/paraglide/messages";

// Mock the messages module
jest.mock("@/paraglide/messages", () => ({
	characters_labels_ageGroup: () => "Age Group",
	characters_placeholders_ageGroup: () => "Select age group",
}));

// Mock the ageGroups constant
jest.mock("@/constants/ageGroups", () => ({
	ageGroups: [
		{ value: "Unknown", label: "Select age group" },
		{ value: "Baby 0-1", label: "Baby (0-1)" },
		{ value: "Toddler 1-3", label: "Toddler (1-3)" },
		{ value: "Kid 3-12", label: "Kid (3-12)" },
		{ value: "Teen 13-19", label: "Teen (13-19)" },
	],
}));

describe("AgeGroupSelect", () => {
	const TestComponent = () => {
		const { control } = useForm<{
			characters: {
				name: string;
				isMainCharacter: boolean;
				ageGroup?: string;
				description?: string;
			}[];
		}>();
		return <AgeGroupSelect control={control} index={0} />;
	};

	it("renders the component with correct label", () => {
		render(<TestComponent />);
		expect(screen.getByText("Age Group")).toBeInTheDocument();
	});

	it("renders the Select component with correct placeholder", () => {
		render(<TestComponent />);
		const selectElement = screen.getByRole("combobox");
		expect(selectElement).toBeInTheDocument();
		expect(selectElement).toHaveTextContent("Select age group");
	});
});
