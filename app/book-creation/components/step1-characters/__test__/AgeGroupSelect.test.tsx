// AgeGroupSelect.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // For simulating user interactions
import { AgeGroupSelect } from "../AgeGroupSelect";
import { useForm } from "react-hook-form";

// Mock the entire messages module
jest.mock("@/paraglide/messages", () => ({
	characters_labels_ageGroup: () => "Age Group",
	characters_placeholders_ageGroup: () => "Select an age group",
	characters_ageGroup_baby: () => "Baby 0-1",
	characters_ageGroup_toddler: () => "Toddler 1-3",
	characters_ageGroup_kid: () => "Kid 3-12",
	characters_ageGroup_teen: () => "Teen 13-19",
	characters_ageGroup_adult: () => "Adult 20-65",
	characters_ageGroup_elderly: () => "Elderly 65+",
}));

// Mock the ageGroups constant
jest.mock("@/constants/ageGroups", () => ({
	ageGroups: [
		{ value: "Unknown", label: "Select an age group" },
		{ value: "Baby 0-1", label: "Baby 0-1" },
		{ value: "Toddler 1-3", label: "Toddler 1-3" },
		{ value: "Kid 3-12", label: "Kid 3-12" },
		{ value: "Teen 13-19", label: "Teen 13-19" },
		{ value: "Adult 20-65", label: "Adult 20-65" },
		{ value: "Elderly 65+", label: "Elderly 65+" },
	],
}));

// Mock the UI components
jest.mock("@/components/ui/select", () => {
	const React = require("react");
	return {
		Select: ({ children }: { children: React.ReactNode }) => (
			<div>{children}</div>
		),
		SelectTrigger: ({ children }: { children: React.ReactNode }) => (
			<button type="button">{children}</button>
		),
		SelectValue: ({ placeholder }: { placeholder?: string }) => (
			<span>{placeholder}</span>
		),
		SelectContent: ({ children }: { children: React.ReactNode }) => (
			<div>{children}</div>
		),
		SelectItem: ({
			value,
			children,
		}: { value: string; children: React.ReactNode }) => (
			<div data-testid="select-item" data-value={value}>
				{children}
			</div>
		),
	};
});

jest.mock("@/components/ui/label", () => {
	const React = require("react");
	return {
		Label: ({
			htmlFor,
			children,
		}: { htmlFor?: string; children: React.ReactNode }) => (
			<label htmlFor={htmlFor}>{children}</label>
		),
	};
});

const TestComponent = ({ index }: { index: number }) => {
	const { control } = useForm<{
		characters: {
			name: string;
			isMainCharacter: boolean;
			characterType: "human" | "animal";
			ageGroup?: string;
			animalType?: string;
			isAnthropomorphic?: boolean;
			description?: string;
		}[];
		illustrationStyle: string;
	}>();
	return <AgeGroupSelect control={control} index={index} />;
};

describe("AgeGroupSelect", () => {
	it("renders without crashing", () => {
		render(<TestComponent index={0} />);
		expect(screen.getByText("Age Group")).toBeInTheDocument();
	});

	it("renders all age group options", () => {
		render(<TestComponent index={0} />);

		// Assuming the SelectTrigger button needs to be clicked to reveal options
		userEvent.click(screen.getByRole("button")); // Open the dropdown

		const options = screen.getAllByTestId("select-item");
		expect(options).toHaveLength(7); // Adjust based on the number of age groups

		expect(options[0]).toHaveTextContent("Select an age group");
		expect(options[1]).toHaveTextContent("Baby 0-1");
		expect(options[2]).toHaveTextContent("Toddler 1-3");
		expect(options[3]).toHaveTextContent("Kid 3-12");
		expect(options[4]).toHaveTextContent("Teen 13-19");
		expect(options[5]).toHaveTextContent("Adult 20-65");
		expect(options[6]).toHaveTextContent("Elderly 65+");
	});
});
