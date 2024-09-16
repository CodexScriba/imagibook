import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreationModeSelector from "../CreationModeSelector";

// Mock the paraglide messages
jest.mock("@/paraglide/messages", () => ({
	selectCreationMode: () => "Select Creation Mode",
	magicWandMode: () => "Magic Wand Mode",
	magicWandDescription: () => "Magic Wand Description",
	storybookStudioMode: () => "Storybook Studio Mode",
	storybookStudioDescription: () => "Storybook Studio Description",
}));

describe("CreationModeSelector", () => {
	const mockOnModeChange = jest.fn();

	beforeEach(() => {
		mockOnModeChange.mockClear();
	});

	it("renders correctly with default mode", () => {
		render(
			<CreationModeSelector mode="magicWand" onModeChange={mockOnModeChange} />,
		);

		expect(screen.getByText("Select Creation Mode")).toBeInTheDocument();
		expect(screen.getByText("Magic Wand Mode")).toBeInTheDocument();
		expect(screen.getByText("Magic Wand Description")).toBeInTheDocument();
		expect(screen.getByText("Storybook Studio Mode")).toBeInTheDocument();
		expect(
			screen.getByText("Storybook Studio Description"),
		).toBeInTheDocument();

		const magicWandCard = screen
			.getByText("Magic Wand Mode")
			.closest('div[role="button"]');
		const storybookStudioCard = screen
			.getByText("Storybook Studio Mode")
			.closest('div[role="button"]');

		expect(magicWandCard).toHaveClass("border-primary");
		expect(storybookStudioCard).not.toHaveClass("border-primary");
	});

	it("changes mode when clicking on a card", () => {
		render(
			<CreationModeSelector mode="magicWand" onModeChange={mockOnModeChange} />,
		);

		const storybookStudioCard = screen
			.getByText("Storybook Studio Mode")
			.closest('div[role="button"]');
		if (storybookStudioCard) {
			fireEvent.click(storybookStudioCard);
		}

		expect(mockOnModeChange).toHaveBeenCalledWith("storybookStudio");
	});

	it("renders correctly with storybookStudio mode", () => {
		render(
			<CreationModeSelector
				mode="storybookStudio"
				onModeChange={mockOnModeChange}
			/>,
		);

		const magicWandCard = screen
			.getByText("Magic Wand Mode")
			.closest('div[role="button"]');
		const storybookStudioCard = screen
			.getByText("Storybook Studio Mode")
			.closest('div[role="button"]');

		expect(magicWandCard).not.toHaveClass("border-primary");
		expect(storybookStudioCard).toHaveClass("border-primary");
	});
});
