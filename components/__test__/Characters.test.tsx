// Characters.test.tsx
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Characters, { charactersSchema } from "../../app/book-creation/components/Characters";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Mock the localization messages
jest.mock("@/paraglide/messages", () => ({
	characters_legend: () => "Characters",
	characters_description: () => "Add character details",
	characters_labels_name: () => "Name",
	characters_labels_description: () => "Description",
	characters_placeholders_name: () => "Enter name",
	characters_placeholders_description: () => "Enter description",
	characters_buttons_add: () => "Add Character",
	characters_buttons_remove: () => "Remove",
	characters_errors_nameRequired: () => "Name is required",
	characters_errors_atLeastOne: () => "At least one character is required",
	// Add other messages if necessary
}));

type CharacterFormData = z.infer<typeof charactersSchema>;

describe("Characters Component", () => {
	const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
		const methods = useForm<{ characters: CharacterFormData }>({
			defaultValues: {
				characters: [{ name: "", description: "" }],
			},
			resolver: zodResolver(z.object({ characters: charactersSchema })),
		});

		return (
			<FormProvider {...methods}>
				<form>{children}</form>
			</FormProvider>
		);
	};

	test("renders the component", () => {
		render(<Characters />, { wrapper: Wrapper });

		// Check that the legend is rendered
		expect(screen.getByText("Characters")).toBeInTheDocument();

		// Check that at least one character name input is rendered
		expect(screen.getByLabelText("Name")).toBeInTheDocument();
	});

	test("adds a new character when 'Add Character' button is clicked", () => {
		render(<Characters />, { wrapper: Wrapper });

		const addButton = screen.getByRole("button", { name: /Add Character/i });
		fireEvent.click(addButton);

		// Now there should be two character name inputs
		const nameInputs = screen.getAllByLabelText("Name");
		expect(nameInputs.length).toBe(2);
	});

	test("removes a character when 'Remove' button is clicked", () => {
		render(<Characters />, { wrapper: Wrapper });

		// Initially, the remove button should not be visible
		expect(
			screen.queryByRole("button", { name: /Remove/i }),
		).not.toBeInTheDocument();

		// Add a new character
		const addButton = screen.getByRole("button", { name: /Add Character/i });
		fireEvent.click(addButton);

		// Now the remove buttons should be visible
		const removeButtons = screen.getAllByRole("button", { name: /Remove/i });
		expect(removeButtons.length).toBe(2);

		// Remove the second character
		fireEvent.click(removeButtons[1]);

		// There should be only one character input left
		const nameInputs = screen.getAllByLabelText("Name");
		expect(nameInputs.length).toBe(1);
	});

	test("shows validation error when character name is empty", async () => {
		const onSubmit = jest.fn();

		const WrapperWithSubmit: React.FC<{ children: React.ReactNode }> = ({
			children,
		}) => {
			const methods = useForm<{ characters: CharacterFormData }>({
				defaultValues: {
					characters: [{ name: "", description: "" }],
				},
				resolver: zodResolver(z.object({ characters: charactersSchema })),
			});

			return (
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)}>
						{children}
						<button type="submit">Submit</button>
					</form>
				</FormProvider>
			);
		};

		render(<Characters />, { wrapper: WrapperWithSubmit });

		const submitButton = screen.getByText("Submit");
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText("Name is required")).toBeInTheDocument();
		});
	});
});
