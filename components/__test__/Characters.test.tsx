let removeButtons: HTMLElement[];

import type React from "react";
import { render, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { charactersSchema } from "@/app/book-creation/components/Characters";
import Characters from "@/app/book-creation/components/Characters";

// Mock the messages module
jest.mock("@/paraglide/messages", () => ({
	characters_errors_nameRequired: () => "Name is required.",
	characters_errors_atLeastOne: () => "At least one character is required.",
	characters_legend: () => "Characters",
	characters_description: () => "Add your characters.",
	characters_labels_name: () => "Name",
	characters_labels_description: () => "Description",
	characters_placeholders_name: () => "Enter name",
	characters_placeholders_description: () => "Enter description",
	characters_buttons_remove: () => "Remove character",
	characters_buttons_add: () => "Add Character",
}));

// Create a wrapper component to provide the form context
const FormWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const methods = useForm<{
		characters: z.infer<typeof charactersSchema>;
	}>({
		defaultValues: {
			characters: [{ name: "", description: "" }],
		},
		resolver: zodResolver(z.object({ characters: charactersSchema })),
	});

	return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("Characters Component", () => {
	test("renders labels only once and checks remove button logic", async () => {
		render(
			<FormWrapper>
				<Characters />
			</FormWrapper>,
		);

		// Check that the legend and description are rendered
		expect(screen.getByText("Characters")).toBeInTheDocument();
		expect(screen.getByText("Add your characters.")).toBeInTheDocument();

		// Check that labels are rendered only once
		expect(screen.getAllByText("Name")).toHaveLength(1);
		expect(screen.getAllByText("Description")).toHaveLength(1);

		// Initially, there should be one character input
		expect(screen.getAllByPlaceholderText("Enter name")).toHaveLength(1);
		expect(screen.getAllByPlaceholderText("Enter description")).toHaveLength(1);

		// The remove button should be disabled when there's only one character
		let removeButtons = screen.getAllByRole("button", {
			name: "Remove character",
		});
		for (const button of removeButtons) {
			expect(button).toBeDisabled();
		}

		// Add a second character
		const addButton = screen.getByRole("button", { name: "Add Character" });
		await userEvent.click(addButton);

		// Now there should be two character inputs
		expect(screen.getAllByPlaceholderText("Enter name")).toHaveLength(2);
		expect(screen.getAllByPlaceholderText("Enter description")).toHaveLength(2);

		// The remove buttons should now be enabled
		removeButtons = screen.getAllByRole("button", { name: "Remove character" });
		for (const button of removeButtons) {
			expect(button).toBeEnabled();
		}

		// Remove one character input
		await userEvent.click(removeButtons[0]);

		// Now there should be one character input remaining
		expect(screen.getAllByPlaceholderText("Enter name")).toHaveLength(1);
		expect(screen.getAllByPlaceholderText("Enter description")).toHaveLength(1);

		// The remove button should be disabled again
		removeButtons = screen.getAllByRole("button", { name: "Remove character" });
		for (const button of removeButtons) {
			expect(button).toBeDisabled();
		}
	});
});
