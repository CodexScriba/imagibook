// app/book-creation/components/__tests__/Characters.test.tsx

import type React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Characters from "../Characters";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, type Step1Values } from "@/app/context/schemas";
import { FormContext } from "@/app/context/FormContext";

// Mock the messages before importing the component
jest.mock("@/paraglide/messages", () => ({
	characters_labels_name: () => "Character Name",
	characters_placeholders_name: () => "Enter character name",
	characters_labels_description: () => "Character Description",
	characters_placeholders_description: () => "Enter character description",
	characters_buttons_add: () => "Add Character",
	characters_buttons_remove: () => "Remove Character",
	characters_errors_nameRequired: () =>
		"Name is required and must contain at least two letters.",
	characters_errors_atLeastOne: () => "At least one character is required.",
}));

describe("Characters Component - Comprehensive Tests", () => {
	// Create a custom TestFormDataProvider
	const TestFormDataProvider: React.FC<{ children: React.ReactNode }> = ({
		children,
	}) => {
		const methods = useForm<Step1Values>({
			resolver: zodResolver(step1Schema),
			defaultValues: {
				characters: [{ name: "", description: "" }],
			},
			mode: "onBlur", // Set validation mode to 'onBlur'
		});

		return (
			<FormContext.Provider value={methods}>
				<FormProvider {...methods}>{children}</FormProvider>
			</FormContext.Provider>
		);
	};

	// Helper function to render the component with necessary providers
	const renderComponent = () =>
		render(
			<TestFormDataProvider>
				<form>
					<Characters />
				</form>
			</TestFormDataProvider>,
		);

	test("renders the component with initial character fields", () => {
		renderComponent();

		// Check that the character name input is rendered
		const nameInput = screen.getByLabelText(/Character Name/i);
		expect(nameInput).toBeInTheDocument();

		// Check that the character description input is rendered
		const descriptionInput = screen.getByLabelText(/Character Description/i);
		expect(descriptionInput).toBeInTheDocument();

		// Check that the add character button is rendered
		const addButton = screen.getByRole("button", { name: /Add Character/i });
		expect(addButton).toBeInTheDocument();

		// Check that the remove character button is rendered but disabled (since there's only one character)
		const removeButton = screen.getByRole("button", {
			name: /Remove Character/i,
		});
		expect(removeButton).toBeDisabled();
	});

	test("allows adding new character fields", () => {
		renderComponent();

		// Click the add character button
		const addButton = screen.getByRole("button", { name: /Add Character/i });
		fireEvent.click(addButton);

		// Expect two sets of character name inputs
		const nameInputs = screen.getAllByLabelText(/Character Name/i);
		expect(nameInputs.length).toBe(2);

		// Expect two sets of character description inputs
		const descriptionInputs = screen.getAllByLabelText(
			/Character Description/i,
		);
		expect(descriptionInputs.length).toBe(2);

		// The remove buttons should now be enabled
		const removeButtons = screen.getAllByRole("button", {
			name: /Remove Character/i,
		});
		for (const button of removeButtons) {
			expect(button).not.toBeDisabled();
		}
	});
	test("allows removing character fields", () => {
		renderComponent();

		// Add two more characters
		const addButton = screen.getByRole("button", { name: /Add Character/i });
		fireEvent.click(addButton);
		fireEvent.click(addButton);

		// Expect three sets of inputs
		let nameInputs = screen.getAllByLabelText(/Character Name/i);
		expect(nameInputs.length).toBe(3);

		// Remove the second character
		const removeButtons = screen.getAllByRole("button", {
			name: /Remove Character/i,
		});
		fireEvent.click(removeButtons[1]); // Remove the second character

		// Expect two sets of inputs now
		nameInputs = screen.getAllByLabelText(/Character Name/i);
		expect(nameInputs.length).toBe(2);
	});

	test("shows validation error when character name is empty", async () => {
		renderComponent();

		const nameInput = screen.getByLabelText(/Character Name/i);

		// Leave the name empty and blur the input
		fireEvent.blur(nameInput);

		// Wait for the validation error message to appear
		await waitFor(() => {
			expect(
				screen.getByText(
					/Name is required and must contain at least two letters./i,
				),
			).toBeInTheDocument();
		});
	});

	test("shows validation error when character name is too short", async () => {
		renderComponent();

		const nameInput = screen.getByLabelText(/Character Name/i);

		// Enter a name with only one letter
		fireEvent.change(nameInput, { target: { value: "A" } });
		fireEvent.blur(nameInput);

		// Wait for the validation error message to appear
		await waitFor(() => {
			expect(
				screen.getByText(
					/Name is required and must contain at least two letters./i,
				),
			).toBeInTheDocument();
		});
	});

	test("does not show validation error when character name is valid", async () => {
		renderComponent();

		const nameInput = screen.getByLabelText(/Character Name/i);

		// Enter a valid name
		fireEvent.change(nameInput, { target: { value: "Alice" } });
		fireEvent.blur(nameInput);

		// Wait for any potential validation error (should not appear)
		await waitFor(() => {
			const errorMessage = screen.queryByText(
				/Name is required and must contain at least two letters./i,
			);
			expect(errorMessage).not.toBeInTheDocument();
		});
	});

	test("shows validation error when trying to remove the last character", async () => {
		renderComponent();

		// Try to remove the only character field
		const removeButton = screen.getByRole("button", {
			name: /Remove Character/i,
		});
		expect(removeButton).toBeDisabled();
	});

	test("ensures at least one character is required", async () => {
		renderComponent();

		// Add a valid character
		const nameInput = screen.getByLabelText(/Character Name/i);
		fireEvent.change(nameInput, { target: { value: "Alice" } });
		fireEvent.blur(nameInput);

		// Add another character and then remove both
		const addButton = screen.getByRole("button", { name: /Add Character/i });
		fireEvent.click(addButton);

		let removeButtons = screen.getAllByRole("button", {
			name: /Remove Character/i,
		});

		// Remove the first character
		fireEvent.click(removeButtons[0]);

		// Remove the second character
		removeButtons = screen.getAllByRole("button", {
			name: /Remove Character/i,
		});
		fireEvent.click(removeButtons[0]);

		// Wait for the validation error message to appear
		await waitFor(() => {
			expect(
				screen.getByText(/At least one character is required./i),
			).toBeInTheDocument();
		});
	});

	test("displays error messages for each character field independently", async () => {
		renderComponent();

		// Add two more characters
		const addButton = screen.getByRole("button", { name: /Add Character/i });
		fireEvent.click(addButton);
		fireEvent.click(addButton);

		// Get all name inputs
		const nameInputs = screen.getAllByLabelText(/Character Name/i);

		// Enter valid name in first input
		fireEvent.change(nameInputs[0], { target: { value: "Alice" } });
		fireEvent.blur(nameInputs[0]);

		// Leave second input empty and blur
		fireEvent.blur(nameInputs[1]);

		// Enter invalid name in third input
		fireEvent.change(nameInputs[2], { target: { value: "B" } });
		fireEvent.blur(nameInputs[2]);

		// Wait for validation errors
		await waitFor(() => {
			const errorMessages = screen.getAllByText(
				/Name is required and must contain at least two letters./i,
			);
			expect(errorMessages.length).toBe(2); // Two errors for second and third inputs
		});
	});
});
