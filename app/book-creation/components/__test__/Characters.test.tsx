import type React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import Characters from "../Characters";

const MockForm: React.FC = () => {
	const methods = useForm({
		defaultValues: {
			characters: [{ name: "", description: "" }],
		},
	});

	return (
		<FormProvider {...methods}>
			<form>
				<Characters />
			</form>
		</FormProvider>
	);
};

describe("Characters", () => {
	it("renders the component with initial fields", () => {
		render(<MockForm />);
		expect(screen.getByText("Character Creation")).toBeInTheDocument();
		expect(screen.getByLabelText("Character Name")).toBeInTheDocument();
		expect(
			screen.getByLabelText("Character Description (Optional)"),
		).toBeInTheDocument();
	});

	it("allows adding a new character", () => {
		render(<MockForm />);
		const addButton = screen.getByRole("button", { name: "Add Character" });
		fireEvent.click(addButton);
		expect(screen.getAllByPlaceholderText("Noah")).toHaveLength(2);
	});

	it("allows removing a character when there are more than one", () => {
		render(<MockForm />);
		const addButton = screen.getByRole("button", { name: "Add Character" });
		fireEvent.click(addButton);
		const removeButtons = screen.getAllByRole("button", {
			name: "Remove Character",
		});
		expect(removeButtons).toHaveLength(2);
		fireEvent.click(removeButtons[0]);
		expect(screen.getAllByPlaceholderText("Noah")).toHaveLength(1);
	});

	it("does not show remove button when there's only one character", () => {
		render(<MockForm />);
		const removeButton = screen.queryByRole("button", {
			name: "Remove Character",
		});
		expect(removeButton).not.toBeInTheDocument();
	});
});
